package com.moneygang.finfarm.domain.market.dto.detail;


import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
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
    private List<AgriculturePriceHistoryDTO> agriculturePriceHistoryDTO;

    public static AgricultureDTO create(Agriculture agriculture,
                                                      List<AgriculturePrice> agriculturePriceList
                                                      ,Integer minPrice, Integer maxPrice
                                                      ,List<AgriculturePriceHistoryDTO> agriculturePriceHistoryDTOList
                                                      ){

        return AgricultureDTO.builder()
                .agricultureName(agriculture.getAgricultureName())
                .agricultureContent(agriculture.getAgricultureContent())
                .unit(agriculture.getAgricultureUnit())
                .seedPrice(Integer.valueOf(
                        String.valueOf(agriculturePriceList.get(agriculturePriceList.size()-1).getAgriculturePriceValue()/5L)))
                .minPriceInWeek(minPrice)
                .maxPriceInWeek(maxPrice)
                .fluctuationPrice(
                        (agriculturePriceList.get(agriculturePriceList.size()-1).getAgriculturePriceValue()
                                - agriculturePriceList.get(agriculturePriceList.size()-2).getAgriculturePriceValue()))
                // ((오늘꺼에서 전날꺼 뺴기) / 오늘가격) * 100
                .fluctuationRate(
                        (double) (agriculturePriceList.get(agriculturePriceList.size()-1).getAgriculturePriceValue()
                                - agriculturePriceList.get(agriculturePriceList.size()-2).getAgriculturePriceValue())
                                / agriculturePriceList.get(agriculturePriceList.size()-1).getAgriculturePriceValue()
                                * 100)
                .agriculturePriceHistoryDTO(agriculturePriceHistoryDTOList)
                .build();
    }
}
