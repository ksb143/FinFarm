package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingLoanRepayRequest {

    private Long loanHistoryPk;
    private Long repayAmount;
    private Integer accountPassword;
}
