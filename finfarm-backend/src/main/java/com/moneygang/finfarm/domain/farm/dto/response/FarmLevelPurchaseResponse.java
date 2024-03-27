package com.moneygang.finfarm.domain.farm.dto.response;

import com.moneygang.finfarm.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FarmLevelPurchaseResponse {
    @Schema(description = "강화 성공 여부", example = "false")
    private Boolean ReinforcementSuccess;
    @Schema(description = "사용자 보유 포인트", example = "3000")
    private Long curPoint;
    @Schema(description = "사용자 현재 레벨", example = "4")
    private Integer farmLevel;
    @Schema(description = "사용자 현재 농장 효율성", example = "7")
    private Integer farmEffect;
    @Schema(description = "다음 농장 강화 비용", example = "4000")
    private Integer nextReinforceCost;
    @Schema(description = "다음 농장 레벨 효율성", example = "11")
    private Integer nextReinforceEffect;
    @Schema(description = "다음 농장 강화 확률 ", example = "2")
    private Double nextReinforceProbability;

    public static FarmLevelPurchaseResponse create(boolean success, Member member,
                                                   int farmEffect, int nextReinforceCost,
                                                   int nextReinforceEffect, double nextReinforceProbability){
        return FarmLevelPurchaseResponse.builder()
                .ReinforcementSuccess(success)
                .curPoint(member.getMemberCurPoint())
                .farmLevel(member.getFarmLevel())
                .farmEffect(farmEffect)
                .nextReinforceCost(nextReinforceCost)
                .nextReinforceEffect(nextReinforceEffect)
                .nextReinforceProbability(nextReinforceProbability)
                .build();
    }
}
