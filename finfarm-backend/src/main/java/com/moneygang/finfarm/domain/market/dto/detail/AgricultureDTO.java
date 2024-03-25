package com.moneygang.finfarm.domain.market.dto.detail;


import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class AgricultureDTO {
    @Schema(description = "농산물 이름", example = "감자")
    private String agricultureName;
    @Schema(description = "농산물 정보", example = "감자입니다.")
    private String agricultureContent;
    @Schema(description = "농산물 단위", example = "1kg")
    private String unit;
    @Schema(description = "농산물 가격", example = "2000")
    private Integer seedPrice;
    @Schema(description = "일주일 간 최저 가격", example = "1800")
    private Integer minPriceInWeek;
    @Schema(description = "일주일 간 최고 가격", example = "2000")
    private Integer maxPriceInWeek;
    @Schema(description = "전날 기준 가격 차이", example = "200")
    private Integer fluctuationPrice;
    @Schema(description = "등락률", example = "2.456677")
    private Double fluctuationRate;
    @Schema(description = "농산물 1년치 가격 정보")
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
