package com.moneygang.finfarm.domain.market.dto;

import com.moneygang.finfarm.domain.market.dto.detail.AgricultureDTO;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import lombok.Builder;

import java.util.List;

@Builder
public class StoreViewAllResponse {
    private List<AgricultureDTO> agricultureDTO;
    private MemberItemsDTO memberItemsDTO;

    public static StoreViewAllResponse createStoreViewAllResponse(List<AgricultureDTO> agricultureDTOList, MemberItemsDTO memberItemsDTO){
        return StoreViewAllResponse.builder()
                .agricultureDTO(agricultureDTOList)
                .memberItemsDTO(memberItemsDTO)
                .build();
    }
}
