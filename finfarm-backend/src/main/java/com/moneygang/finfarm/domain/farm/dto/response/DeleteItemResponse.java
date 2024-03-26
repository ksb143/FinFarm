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
public class DeleteItemResponse {
    @Schema(description = "사용자 닉네임", example = "하빙")
    private String nickname;
    @Schema(description = "사용자 이미지 URL", example = "www.abc.com")
    private String imageUrl;
    @Schema(description = "현재 포인트", example = "3000")
    private Long curPoint;
    @Schema(description = "현재 농장 레벨", example = "3")
    private Integer farmLevel;
    @Schema(description = "농장 밭 정보")
    private List<FarmFieldInfo> farmFieldInfo;
    @Schema(description = "소지한 아이템")
    private MemberItemsDTO memberItems;

    public static DeleteItemResponse create(Member member, List<FarmFieldInfo> farmFieldInfoList, MemberItemsDTO memberItemsDTO){
        return DeleteItemResponse.builder()
                .nickname(member.getMemberNickname())
                .imageUrl(member.getMemberImageUrl())
                .curPoint(member.getMemberCurPoint())
                .farmLevel(member.getFarmLevel())
                .farmFieldInfo(farmFieldInfoList)
                .memberItems(memberItemsDTO)
                .build();
    }
}
