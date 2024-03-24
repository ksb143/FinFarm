package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.entity.Loan;
import com.moneygang.finfarm.domain.banking.entity.LoanHistory;
import com.moneygang.finfarm.domain.banking.repository.LoanHistoryRepository;
import com.moneygang.finfarm.domain.banking.repository.LoanRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanHistoryServiceImpl implements LoanHistoryService {

    private final LoanRepository loanRepository;
    private final LoanHistoryRepository loanHistoryRepository;
    private final MemberRepository memberRepository;

    @Override
    public void getLoanHistory() {

    }

    @Override
    public void loan(long memberPk, long loanPk, long amount, int accountPassword) {
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


    }

    @Override
    public void loanAudit() {

    }

    @Override
    public void loanRepay() {

    }
}
