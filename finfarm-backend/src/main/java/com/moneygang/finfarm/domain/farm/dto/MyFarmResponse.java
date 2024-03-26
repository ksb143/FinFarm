package com.moneygang.finfarm.domain.farm.dto;

import com.moneygang.finfarm.domain.farm.dto.detail.FarmFieldInfo;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.entity.Reinforce;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MyFarmResponse {
    private String nickName;
    private String imageUrl;
    private Long curPoint;
    private Integer farmLevel;
    private Integer farmEffect;
    private Integer nextReinforceCost;
    private Integer nextReinforceEffect;
    private Double nextReinforceProbability;
    private List<FarmFieldInfo> farmFieldInfo;
    private MemberItemsDTO memberItems;

    public static MyFarmResponse create(Member member, List<FarmFieldInfo> farmFieldInfo,
                                        MemberItemsDTO memberItemsDTO, Integer nextReinforceCost,
                                        Integer farmEffect, Integer nextReinforceEffect,
                                        Double nextReinforceProbability){
        return MyFarmResponse.builder()
                .nickName(member.getMemberNickname())
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
