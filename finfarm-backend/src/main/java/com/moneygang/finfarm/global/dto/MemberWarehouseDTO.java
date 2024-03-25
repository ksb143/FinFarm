package com.moneygang.finfarm.global.dto;

import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberWarehouseDTO {
    private Member member;
    private MemberItemsDTO memberItems;

    public static MemberWarehouseDTO create(Member member, MemberItemsDTO memberItems) {
        return new MemberWarehouseDTO(member, memberItems);
    }
}
