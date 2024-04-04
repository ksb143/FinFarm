package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BankingLoanRepayResponse {

    private Long loanPk;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long accountBalance;

    public static BankingLoanRepayResponse create(Long loanPk, LocalDate startDate, LocalDate endDate, Long accountBalance) {
        return BankingLoanRepayResponse.builder()
                .loanPk(loanPk)
                .startDate(startDate)
                .endDate(endDate)
                .accountBalance(accountBalance)
                .build();
    }
}
