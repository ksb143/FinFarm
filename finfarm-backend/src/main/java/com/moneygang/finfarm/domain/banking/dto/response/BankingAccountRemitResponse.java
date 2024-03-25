package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BankingAccountRemitResponse {

    private Long accountBalance;
    private LocalDateTime requestTime;

    public static BankingAccountRemitResponse create(Long accountBalance, LocalDateTime requestTime) {
        return BankingAccountRemitResponse.builder()
                .accountBalance(accountBalance)
                .requestTime(requestTime)
                .build();
    }
}
