package com.moneygang.finfarm.domain.farm.dto.response;

import com.moneygang.finfarm.domain.farm.dto.detail.FarmFieldInfo;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MyFarmResponse {
    @Schema(description = "사용자 닉네임", example = "하빙")
    private String nickname;
    @Schema(description = "사용자 이미지 URL", example = "www.abc.com")
    private String imageUrl;
    @Schema(description = "현재 포인트", example = "3000")
    private Long curPoint;
    @Schema(description = "현재 농장 레벨", example = "3")
    private Integer farmLevel;
    @Schema(description = "현재 농장 효율성", example = "4")
    private Integer farmEffect;
    @Schema(description = "다음 농장 강화 비용", example = "4000")
    private Integer nextReinforceCost;
    @Schema(description = "다음 농장 효율성", example = "7")
    private Integer nextReinforceEffect;
    @Schema(description = "다음 농장 강화 확률", example = "3")
    private Double nextReinforceProbability;
    @Schema(description = "농장 밭 정보")
    private List<FarmFieldInfo> farmFieldInfo;
    @Schema(description = "소지한 아이템")
    private MemberItemsDTO memberItems;

    public static MyFarmResponse create(Member member, List<FarmFieldInfo> farmFieldInfo,
                                        MemberItemsDTO memberItemsDTO, Integer nextReinforceCost,
                                        Integer farmEffect, Integer nextReinforceEffect,
                                        Double nextReinforceProbability){
        return MyFarmResponse.builder()
                .nickname(member.getMemberNickname())
                .imageUrl(member.getMemberImageUrl())
                .curPoint(member.getMemberCurPoint())
                .farmLevel(member.getFarmLevel())
                .farmEffect(farmEffect)
                .nextReinforceCost(Math.toIntExact(nextReinforceCost))
                .nextReinforceEffect(nextReinforceEffect)
                .nextReinforceProbability(nextReinforceProbability)
                .farmFieldInfo(farmFieldInfo)
                .memberItems(memberItemsDTO)
                .build();
    }
}
