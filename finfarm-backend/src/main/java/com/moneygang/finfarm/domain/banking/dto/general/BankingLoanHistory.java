package com.moneygang.finfarm.domain.banking.dto.general;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BankingLoanHistory {

    private Long pk;
    private String name;
    private Double interest;
    private Long amount;
    private Long repayAmount;
    private Integer period;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isRepay;

    public static BankingLoanHistory create(Long pk, String name, Double interest,
                                            Long amount, Long repayAmount, Integer period,
                                            LocalDate startDate, LocalDate endDate, Boolean isRepay) {
        return BankingLoanHistory.builder()
                .pk(pk)
                .name(name)
                .interest(interest)
                .amount(amount)
                .repayAmount(repayAmount)
                .period(period)
                .startDate(startDate)
                .endDate(endDate)
                .isRepay(isRepay)
                .build();
    }
}
