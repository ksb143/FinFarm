package com.moneygang.finfarm.domain.market.dto.detail;

import com.moneygang.finfarm.domain.market.entity.Agriculture;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AgricultureInfo {
    @Schema(description = "농산물 이름", example = "고구마")
    private String agricultureName;
    @Schema(description = "농산물 단위", example = "1kg")
    private String agricultureUnit;
    @Schema(description = "농산물 정보", example = "고구마입니다.")
    private String agricultureContent;
    @Schema(description = "보유한 농산물 개수", example = "6")
    private Integer agricultureAmount;

    public static AgricultureInfo create(Agriculture agriculture, Integer amount){
        return AgricultureInfo.builder()
                .agricultureName(agriculture.getAgricultureName())
                .agricultureUnit(agriculture.getAgricultureUnit())
                .agricultureContent(agriculture.getAgricultureContent())
                .agricultureAmount(amount)
                .build();
    }
}
