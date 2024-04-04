package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingAccountRemitRequest {

    private String otherNickname;
    private Long amount;
    private String accountPassword;
}
