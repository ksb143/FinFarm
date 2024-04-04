package com.moneygang.finfarm.domain.farm.dto.response;

import com.moneygang.finfarm.domain.farm.dto.detail.FarmFieldInfo;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class HarvestResponse {
    private String nickname;
    private String imageUrl;
    private Long curPoint;
    private Integer farmLevel;
    private List<FarmFieldInfo> farmFieldInfo;
    private MemberItemsDTO memberItems;

    public static HarvestResponse create(Member member,
                                         List<FarmFieldInfo> farmFieldInfo,
                                         MemberItemsDTO memberItems){
        return HarvestResponse.builder()
                .nickname(member.getMemberNickname())
                .imageUrl(member.getMemberImageUrl())
                .curPoint(member.getMemberCurPoint())
                .farmLevel(member.getFarmLevel())
                .farmFieldInfo(farmFieldInfo)
                .memberItems(memberItems)
                .build();
    }
}
