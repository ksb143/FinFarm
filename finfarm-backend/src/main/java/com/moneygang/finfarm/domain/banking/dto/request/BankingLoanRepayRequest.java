package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingLoanRepayRequest {

    private Long loanPk;
    private Long amount;
    private Integer accountPassword;
}
