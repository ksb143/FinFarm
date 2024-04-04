package com.moneygang.finfarm.domain.market.dto.detail;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AgriculturePriceHistoryDTO {
    @Schema(description = "날짜", example = "2024-03-25")
    private LocalDate date;
    @Schema(description = "농산물 가격", example = "2000")
    private Integer agriculturePrice;

    public static AgriculturePriceHistoryDTO create(LocalDate date, Integer agriculturePrice){
        return AgriculturePriceHistoryDTO.builder()
                .date(date)
                .agriculturePrice(agriculturePrice)
                .build();
    }
}
