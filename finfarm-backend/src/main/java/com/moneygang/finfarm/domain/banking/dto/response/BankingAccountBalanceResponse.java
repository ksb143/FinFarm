package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingAccountBalanceResponse {

    private Long accountBalance;

    public static BankingAccountBalanceResponse create(Long accountBalance) {
        return BankingAccountBalanceResponse.builder()
                .accountBalance(accountBalance)
                .build();
    }
}
