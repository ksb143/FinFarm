package com.moneygang.finfarm.domain.farm.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class HarvestRequest {
    @Schema(description = "수확할 밭(FarmField)의 index", example = "1")
    Integer farmFieldIndex;
}
