package com.moneygang.finfarm.domain.market.dto.detail;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AgriculturePriceHistoryDTO {
    private LocalDate date;
    private Integer agriculturePrice;

    public static AgriculturePriceHistoryDTO createAgriculturePriceHistoryDTO(LocalDate date, Integer agriculturePrice){
        return AgriculturePriceHistoryDTO.builder()
                .date(date)
                .agriculturePrice(agriculturePrice)
                .build();
    }
}
