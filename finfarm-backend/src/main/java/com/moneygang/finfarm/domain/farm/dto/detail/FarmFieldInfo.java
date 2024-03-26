package com.moneygang.finfarm.domain.farm.dto.detail;

import com.moneygang.finfarm.domain.farm.entity.FarmField;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FarmFieldInfo {
    private Integer index;
    private String agricultureName;
    private String unit;
    private LocalDateTime harvestTime;

    public static FarmFieldInfo create(FarmField farmField, Agriculture agriculture){
        return FarmFieldInfo.builder()
                .index(farmField.getFarmFieldIndex())
                .agricultureName(agriculture.getAgricultureName())
                .unit(agriculture.getAgricultureUnit())
                .harvestTime(farmField.getFarmFieldEndTime())
                .build();
    }
}
