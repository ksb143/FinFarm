package com.moneygang.finfarm.domain.banking.entity;

import com.moneygang.finfarm.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "loan_history_TB")
@Getter
public class LoanHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_history_pk")
    private Long loanHistoryPk;

    @Column(name = "loan_history_price")
    private Long loanHistoryPrice;

    @Column(name = "loan_history_start_date")
    private LocalDate loanHistoryStartDate;

    @Column(name = "loan_history_end_date")
    private LocalDate loanHistoryEndDate;

    @ManyToOne
    @JoinColumn(name = "member_pk")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "loan_pk")
    private Loan loan;

    @Builder
    public LoanHistory(Long amount, Member member, Loan loan) {
        this.loanHistoryPrice = amount;
        this.loanHistoryStartDate = LocalDate.now();
        this.loanHistoryEndDate = LocalDate.now().plusDays(loan.getLoanPeriod());
        setMember(member);
        setLoan(loan);
    }

    protected LoanHistory() {}

//    public LoanHistory loan(Long amount, Member member, Loan loan) {
//        LoanHistory loanHistory = LoanHistory.builder()
//                .amount(amount)
//                .member(member)
//                .loan(loan)
//                .build();
//    }

    public void setMember(Member member) {
        this.member = member;
        member.getLoanHistoryList().add(this);
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
        loan.getLoanHistoryList().add(this);
    }
}
