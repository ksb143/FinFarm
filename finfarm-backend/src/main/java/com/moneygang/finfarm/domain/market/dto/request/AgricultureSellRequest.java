package com.moneygang.finfarm.domain.market.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class AgricultureSellRequest {
    @Schema(description = "농산물 이름", example = "수박")
    private String agricultureName;
    @Schema(description = "농산물 개수", example = "3")
    private Integer agricultureAmount;
}
