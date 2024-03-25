package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanRepayRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanTakeRequest;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanRepayResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanTakeResponse;
import com.moneygang.finfarm.domain.banking.entity.Account;
import com.moneygang.finfarm.domain.banking.entity.Loan;
import com.moneygang.finfarm.domain.banking.entity.LoanHistory;
import com.moneygang.finfarm.domain.banking.repository.AccountRepository;
import com.moneygang.finfarm.domain.banking.repository.LoanHistoryRepository;
import com.moneygang.finfarm.domain.banking.repository.LoanRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanHistoryServiceImpl implements LoanHistoryService {

    private final LoanRepository loanRepository;
    private final LoanHistoryRepository loanHistoryRepository;
    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;

    private final AccountService accountService;

    private final CommonUtil commonUtil;

    @Override
    public void getLoanHistory() {

    }

    @Override
    public ResponseEntity<BankingLoanTakeResponse> loan(BankingLoanTakeRequest request) {
        Member member = commonUtil.getMember();
        Optional<Loan> optionalLoan = loanRepository.findById(request.getLoanPk());

        // 예외1: 해당 대출 상품이 없을 때 (400)
        if(optionalLoan.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Loan Not Found");
        }

        // 예외2: 입력 비밀번호가 계좌 비밀번호랑 다를 때 (400)
        if(!member.getMemberAccountPassword().equals(String.valueOf(request.getAccountPassword()))) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "Password Not Match");
        }

        Loan loan = optionalLoan.get();
        Long amount = request.getAmount();

        LoanHistory loanHistory = LoanHistory.builder()
                .amount(amount)
                .member(member)
                .loan(loan)
                .build();

        Long loanHistoryPk = loanHistory.getLoanHistoryPk();

        Account accountLoan = Account.builder()
                .amount(amount)
                .type("대출")
                .nickname(String.valueOf(loanHistoryPk))
                .member(member)
                .build();

        loanHistoryRepository.save(loanHistory);
        accountRepository.save(accountLoan);

        LocalDate startDate = loanHistory.getLoanHistoryStartDate();
        LocalDate endDate = loanHistory.getLoanHistoryEndDate();

        long accountBalance = accountService.getAccountBalance(member.getMemberPk());

        BankingLoanTakeResponse response = BankingLoanTakeResponse.create(loanHistoryPk, startDate, endDate, accountBalance);

        return ResponseEntity.ok(response);
    }

    @Override
    public void loanAudit() {
        Member member = commonUtil.getMember();

        /**
         * (API 참고) Member에 isCurrentlyLoan, haveOverDue, haveBankruptcy 여부를 추가할지, 계산할지
         */

    }

    @Override
    public ResponseEntity<BankingLoanRepayResponse> loanRepay(BankingLoanRepayRequest request) {
        Member member = commonUtil.getMember();
        Long loanHistoryPk = request.getLoanHistoryPk();
        Optional<LoanHistory> optionalLoanHistory = loanHistoryRepository.findById(loanHistoryPk);

        // 예외1: 해당 대출 상품이 없을 때 (400)
        if(optionalLoanHistory.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Loan History Not Found");
        }

        // 예외2: 입력 비밀번호가 계좌 비밀번호랑 다를 때 (400)
        if(!member.getMemberAccountPassword().equals(String.valueOf(request.getAccountPassword()))) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "Password Not Match");
        }


        LoanHistory loanHistory = optionalLoanHistory.get();

        Account accountLoanRepay = Account.builder()
                .amount((-1)*request.getAmount())
                .type("상환")
                .nickname(String.valueOf(loanHistoryPk))
                .member(member)
                .build();

        accountRepository.save(accountLoanRepay);
        loanHistory.setRepay();

        LocalDate startDate = loanHistory.getLoanHistoryStartDate();
        LocalDate endDate = loanHistory.getLoanHistoryEndDate();

        long accountBalance = accountService.getAccountBalance(member.getMemberPk());

        BankingLoanRepayResponse response = BankingLoanRepayResponse.create(loanHistoryPk, startDate, endDate, accountBalance);

        return ResponseEntity.ok(response);
    }
}
