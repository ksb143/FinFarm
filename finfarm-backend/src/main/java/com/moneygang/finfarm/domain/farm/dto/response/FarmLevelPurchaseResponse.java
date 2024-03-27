package com.moneygang.finfarm.domain.farm.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FarmLevelPurchaseResponse {
    private Boolean ReinforcementSuccess;
    private Long curPoint;
    private Integer farmLevel;
    private Double farmEffect;
    private Integer nextReinforceCost;
    private Double nextReinforceEffect;
    private Integer nextReinforceProbability;

    public static FarmLevelPurchaseResponse create(){
        return FarmLevelPurchaseResponse.builder()

                .build();
    }
}
