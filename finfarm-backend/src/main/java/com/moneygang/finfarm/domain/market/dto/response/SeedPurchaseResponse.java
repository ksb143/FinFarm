package com.moneygang.finfarm.domain.market.dto.response;

import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeedPurchaseResponse {
    @Schema(description = "현재 포인트", example = "3000")
    private Long memberPoint;
    @Schema(description = "보유한 아이템")
    private MemberItemsDTO memberItemsDTO;

    public static SeedPurchaseResponse create(Long memberPoint, MemberItemsDTO memberItemsDTO){
        return SeedPurchaseResponse.builder()
                .memberPoint(memberPoint)
                .memberItemsDTO(memberItemsDTO)
                .build();
    }
}
