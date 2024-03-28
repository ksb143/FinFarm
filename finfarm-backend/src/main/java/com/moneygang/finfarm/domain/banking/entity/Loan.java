package com.moneygang.finfarm.domain.banking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.List;

@Getter
@Entity(name = "loan_TB")
public class Loan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_pk")
    private Long loanPk;

    @Column(name = "loan_name")
    private String loanName;

    @Column(name = "loan_interest")
    private Double loanInterest;

    @Column(name = "loan_period")
    private Integer loanPeriod;

    @Column(name = "loan_target")
    private String loanTarget;

    @Column(name = "loan_info")
    private String loanInfo;

    @Column(name = "loan_limit")
    private Integer loanLimit;

    @JsonIgnore
    @OneToMany(mappedBy = "loan")
    private List<LoanHistory> loanHistoryList;
}
