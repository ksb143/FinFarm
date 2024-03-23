package com.moneygang.finfarm.domain.banking.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BankingAccountDepositResponse {

    private Long point;
    private Long remainAmount;
    private LocalDateTime requestTime;
}
