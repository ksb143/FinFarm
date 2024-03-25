package com.moneygang.finfarm.domain.market.dto.detail;

import com.moneygang.finfarm.domain.market.entity.Agriculture;
import lombok.Builder;

@Builder
public class AgricultureInfo {
    private String agricultureName;
    private String agricultureUnit;
    private Integer agricultureAmount;

    public static AgricultureInfo createAgricultureInfo(Agriculture agriculture, Integer amount){
        return AgricultureInfo.builder()
                .agricultureName(agriculture.getAgricultureName())
                .agricultureUnit(agriculture.getAgricultureUnit())
                .agricultureAmount(amount)
                .build();
    }
}
