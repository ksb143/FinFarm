package com.moneygang.finfarm.domain.farm.dto.detail;

import com.moneygang.finfarm.domain.farm.entity.FarmField;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FarmFieldInfo {
    @Schema(description = "밭 위치", example = "3")
    private Integer index;
    @Schema(description = "심은 농작물 이름", example = "애호박")
    private String agricultureName;
    @Schema(description = "단위", example = "1kg")
    private String unit;
    @Schema(description = "수확 시간", example = "2024-03-26T18:00:00")
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
