package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingAccountWithdrawRequest {

    private Long amount;
    private Integer accountPassword;
}
