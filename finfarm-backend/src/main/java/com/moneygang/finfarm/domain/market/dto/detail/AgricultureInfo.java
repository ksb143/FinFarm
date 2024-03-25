package com.moneygang.finfarm.domain.market.dto.detail;

import com.moneygang.finfarm.domain.market.entity.Agriculture;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AgricultureInfo {
    private String agricultureName;
    private String agricultureUnit;
    private String agricultureContent;
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
