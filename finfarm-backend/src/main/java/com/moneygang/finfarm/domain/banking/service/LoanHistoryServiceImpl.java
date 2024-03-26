package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.dto.general.BankingLoanHistory;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanAuditRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanRepayRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanTakeRequest;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanAuditResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanRepayResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanResponse;
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
import java.util.ArrayList;
import java.util.List;
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
    public ResponseEntity<BankingLoanResponse> getLoanHistory() {
        Member member = commonUtil.getMember();

        List<LoanHistory> loanHistoryList = member.getLoanHistoryList();

        List<BankingLoanHistory> currentLoans = new ArrayList<>();
        List<BankingLoanHistory> loanHistories = new ArrayList<>();
        long totalTakeAmount = 0L;
        long totalRepayAmount = 0L;

        for(LoanHistory history: loanHistoryList) {
            Loan loan = history.getLoan();
            Long pk = loan.getLoanPk();
            String name = loan.getLoanName();
            Double interest = loan.getLoanInterest();
            Integer period = loan.getLoanPeriod();
            Long amount = history.getLoanHistoryAmount();
            Long repayAmount = history.getLoanHistoryRepayAmount();
            LocalDate startDate = history.getLoanHistoryStartDate();
            LocalDate endDate = history.getLoanHistoryEndDate();
            Boolean isRepay = history.getIsRepay();

            BankingLoanHistory loanHistory = BankingLoanHistory.create(pk, name, interest, period,
                    amount, repayAmount, startDate, endDate, isRepay);

            if(isRepay) totalRepayAmount += repayAmount; // 상환한 대출 내역 -> 총 상환 금액에 추가
            else currentLoans.add(loanHistory); // 상환하지 않은 대출 내역 -> 현재 대출 현황에 추가

            totalTakeAmount += amount; // 총 대출 금액 추가
            loanHistories.add(loanHistory); // 대출 내역에 추가
        }

        BankingLoanResponse response = BankingLoanResponse.create(currentLoans, loanHistories, totalTakeAmount, totalRepayAmount);

        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional
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
    public ResponseEntity<BankingLoanAuditResponse> loanAudit(BankingLoanAuditRequest request) {
        Member member = commonUtil.getMember();

        boolean haveOverDue = member.isMemberLoanOverdue();; // 연체 내역이 있는지
        boolean isCurrentlyLoan = false; // 현재 해당 대출 상품을 이용하고 있는지
        boolean canLoan = false;

        long loanPk = request.getLoanPk();
        List<LoanHistory> loanHistoryList = member.getLoanHistoryList();
        for(LoanHistory history: loanHistoryList) {
            // 해당 대출에 대한 내역이 있고, 상환을 하지 않은 경우
            if(history.getLoan().getLoanPk()==loanPk && !history.getIsRepay()) {
                isCurrentlyLoan = true;
                break;
            }
        }

        canLoan = (!haveOverDue && !isCurrentlyLoan);
        BankingLoanAuditResponse response = BankingLoanAuditResponse.create(canLoan, isCurrentlyLoan, haveOverDue);

        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional
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
        loanHistory.repay();

        LocalDate startDate = loanHistory.getLoanHistoryStartDate();
        LocalDate endDate = loanHistory.getLoanHistoryEndDate();

        long accountBalance = accountService.getAccountBalance(member.getMemberPk());

        BankingLoanRepayResponse response = BankingLoanRepayResponse.create(loanHistoryPk, startDate, endDate, accountBalance);

        return ResponseEntity.ok(response);
    }
}
