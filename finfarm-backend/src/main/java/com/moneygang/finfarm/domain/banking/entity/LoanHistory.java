package com.moneygang.finfarm.domain.banking.entity;

import com.moneygang.finfarm.domain.member.entity.Member;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name = "loan_history_TB")
public class LoanHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_history_pk")
    private Long loanHistoryPk;

    @Column(name = "loan_history_price")
    private Integer loanHistoryPrice;

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
}
