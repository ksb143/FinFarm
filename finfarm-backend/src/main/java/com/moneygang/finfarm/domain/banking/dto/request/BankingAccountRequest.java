package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BankingAccountRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private String accountType;
    private String accountNickname; // 적요 내용
    private String sortCriteria;
}
