package com.moneygang.finfarm.domain.market.dto.detail;


import lombok.Builder;

@Builder
public class AgricultureDTO {
    private String agricultureName;
    private String agricultureContent;
    private String unit;
    private Integer seedPrice;
    private Integer minPriceInWeek;
    private Integer maxPriceInWeek;
    private Integer fluctuationPrice;
    private Double fluctuationRate;
    private AgriculturePriceHistoryDTO agriculturePriceHistoryDTO;

    public static AgricultureDTO createAgricultureDTO(){
        return AgricultureDTO.builder().build();
    }
}
