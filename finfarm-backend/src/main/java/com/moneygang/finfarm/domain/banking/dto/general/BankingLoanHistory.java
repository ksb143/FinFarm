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
    private Integer period;
    private Integer dDay;
    private Long amount;
    private Long repayAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isRepay;

    public static BankingLoanHistory create(Long pk, String name, Double interest, Integer period, Integer dDay,
                                            Long amount, Long repayAmount,
                                            LocalDate startDate, LocalDate endDate, Boolean isRepay) {
        return BankingLoanHistory.builder()
                .pk(pk)
                .name(name)
                .interest(interest)
                .period(period)
                .dDay(dDay)
                .amount(amount)
                .repayAmount(repayAmount)
                .startDate(startDate)
                .endDate(endDate)
                .isRepay(isRepay)
                .build();
    }
}
