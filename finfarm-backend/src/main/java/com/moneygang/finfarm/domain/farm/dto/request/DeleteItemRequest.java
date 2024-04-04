package com.moneygang.finfarm.domain.farm.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class DeleteItemRequest {
    @Schema(description = "버릴 아이템 이름", example = "씨감자")
    private String name;
    @Schema(description = "버릴 아이템 개수", example = "2")
    private Integer amount;
}
