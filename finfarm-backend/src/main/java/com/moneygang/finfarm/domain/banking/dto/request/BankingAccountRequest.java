package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingAccountRequest {
    private String startDate;
    private String endDate;
    private String accountType;
    private String accountNickname; // 적요 내용
    private String sortCriteria;
}
