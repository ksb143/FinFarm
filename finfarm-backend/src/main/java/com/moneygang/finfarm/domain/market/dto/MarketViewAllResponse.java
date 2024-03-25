package com.moneygang.finfarm.domain.market.dto;

import com.moneygang.finfarm.domain.market.dto.detail.AgricultureDTO;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MarketViewAllResponse {
    @Schema(description = "농산물 정보들")
    private List<AgricultureDTO> agricultureDTO;
    @Schema(description = "보유한 아이템")
    private MemberItemsDTO memberItemsDTO;

    public static MarketViewAllResponse create(List<AgricultureDTO> agricultureDTOList
                                                                  , MemberItemsDTO memberItems){
        return MarketViewAllResponse.builder()
                .agricultureDTO(agricultureDTOList)
                .memberItemsDTO(memberItems)
                .build();
    }
}
