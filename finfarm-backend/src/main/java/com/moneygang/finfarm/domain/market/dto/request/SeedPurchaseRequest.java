package com.moneygang.finfarm.domain.market.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class SeedPurchaseRequest {
    @Schema(description = "씨앗 이름", example = "수박 씨앗")
    private String seedName;
    @Schema(description = "씨앗 개수", example = "3")
    private Integer seedCount;
}
