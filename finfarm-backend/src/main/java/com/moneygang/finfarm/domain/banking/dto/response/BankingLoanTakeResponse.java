package com.moneygang.finfarm.domain.banking.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BankingLoanTakeResponse {

    private Long loanPk;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long accountBalance;

    public static BankingLoanTakeResponse create(Long loanPk, LocalDate startDate, LocalDate endDate, Long accountBalance) {
        return BankingLoanTakeResponse.builder()
                .loanPk(loanPk)
                .startDate(startDate)
                .endDate(endDate)
                .accountBalance(accountBalance)
                .build();
    }
}
