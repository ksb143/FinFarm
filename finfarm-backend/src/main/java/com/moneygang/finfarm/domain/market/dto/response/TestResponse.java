package com.moneygang.finfarm.domain.market.dto.response;

import com.moneygang.finfarm.domain.market.dto.detail.AgricultureDTO;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TestResponse {
    @Schema(description = "농산물 정보들")
    private List<AgricultureDTO> agricultureDTO;

    public static TestResponse create(List<AgricultureDTO> agricultureDTOList){
        return TestResponse.builder()
                .agricultureDTO(agricultureDTOList)
                .build();
    }
}
