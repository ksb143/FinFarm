package com.moneygang.finfarm.domain.banking.service;

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

    @Override
    public void getLoanHistory() {

    }

    @Override
    public ResponseEntity<BankingLoanTakeResponse> loan(long memberPk, long loanPk, long amount, int accountPassword) {
        Optional<Member> optionalMember = memberRepository.findById(memberPk);
        Optional<Loan> optionalLoan = loanRepository.findById(loanPk);

        // 예외1: 해당 사용자나 대출 상품이 없을 때
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }
        if(optionalLoan.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Loan Not Found");
        }

        Member member = optionalMember.get();
        Loan loan = optionalLoan.get();

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

        long accountBalance = accountService.getAccountBalance(memberPk);

        BankingLoanTakeResponse response = BankingLoanTakeResponse.create(loanHistoryPk, startDate, endDate, accountBalance);

        return ResponseEntity.ok(response);
    }

    @Override
    public void loanAudit() {

    }

    @Override
    public ResponseEntity<BankingLoanRepayResponse> loanRepay(long memberPk, long loanHistoryPk, long amount, int accountPassword) {
        Optional<Member> optionalMember = memberRepository.findById(memberPk);
        Optional<LoanHistory> optionalLoanHistory = loanHistoryRepository.findById(loanHistoryPk);

        // 예외1: 해당 사용자나 대출 상품이 없을 때
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }
        if(optionalLoanHistory.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Loan History Not Found");
        }

        Member member = optionalMember.get();
        LoanHistory loanHistory = optionalLoanHistory.get();

        Account accountLoanRepay = Account.builder()
                .amount((-1)*amount)
                .type("상환")
                .nickname(String.valueOf(loanHistoryPk))
                .member(member)
                .build();

        accountRepository.save(accountLoanRepay);
        loanHistory.setRepay();

        LocalDate startDate = loanHistory.getLoanHistoryStartDate();
        LocalDate endDate = loanHistory.getLoanHistoryEndDate();

        long accountBalance = accountService.getAccountBalance(memberPk);

        BankingLoanRepayResponse response = BankingLoanRepayResponse.create(loanHistoryPk, startDate, endDate, accountBalance);

        return ResponseEntity.ok(response);
    }
}
