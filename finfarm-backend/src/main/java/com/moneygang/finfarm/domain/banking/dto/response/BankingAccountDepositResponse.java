package com.moneygang.finfarm.domain.banking.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BankingAccountDepositResponse {

    private Long curPoint;
    private Long accountBalance;
    private LocalDateTime requestTime;

    public static BankingAccountDepositResponse create(Long curPoint, Long accountBalance, LocalDateTime requestTime) {
        return BankingAccountDepositResponse.builder()
                .curPoint(curPoint)
                .accountBalance(accountBalance)
                .requestTime(requestTime)
                .build();
    }
}
