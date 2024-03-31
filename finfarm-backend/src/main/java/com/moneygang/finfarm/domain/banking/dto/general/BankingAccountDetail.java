package com.moneygang.finfarm.domain.banking.dto.general;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class BankingAccountDetail {
    private Long amount;
    private Long accountBalanceAtThatTime;
    private LocalDateTime accountDate;
    private String type;
    private String nickname;

    public static BankingAccountDetail create(Long amount, Long accountBalanceAtThatTime, LocalDateTime date, String type, String nickname) {
        return BankingAccountDetail.builder()
                .amount(amount)
                .accountBalanceAtThatTime(accountBalanceAtThatTime)
                .accountDate(date)
                .type(type)
                .nickname(nickname)
                .build();
    }
}
