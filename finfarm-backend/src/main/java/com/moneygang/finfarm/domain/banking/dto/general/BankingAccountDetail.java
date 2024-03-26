package com.moneygang.finfarm.domain.banking.dto.general;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BankingAccountDetail {
    private Long amount;
    private LocalDate date;
    private String type;
    private String nickname;

    public static BankingAccountDetail create(Long amount, LocalDate date, String type, String nickname) {
        return BankingAccountDetail.builder()
                .amount(amount)
                .date(date)
                .type(type)
                .nickname(nickname)
                .build();
    }
}
