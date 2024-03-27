package com.moneygang.finfarm.domain.farm.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class PlantRequest {
    @Schema(description = "심을 씨앗 밭 위치", example = "10")
    private Integer farmFieldIndex;
    @Schema(description = "심을 씨앗 이름", example = "씨감자")
    private String seedName;
}
