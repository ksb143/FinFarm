package com.moneygang.finfarm.domain.banking.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BankingLoanTakeResponse {

    private Long loanHistoryPk;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long accountBalance;

    public static BankingLoanTakeResponse create(Long loanHistoryPk, LocalDate startDate, LocalDate endDate, Long accountBalance) {
        return BankingLoanTakeResponse.builder()
                .loanHistoryPk(loanHistoryPk)
                .startDate(startDate)
                .endDate(endDate)
                .accountBalance(accountBalance)
                .build();
    }
}
