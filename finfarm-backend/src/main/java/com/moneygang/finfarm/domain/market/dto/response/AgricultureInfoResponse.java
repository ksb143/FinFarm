package com.moneygang.finfarm.domain.market.dto.response;

import com.moneygang.finfarm.domain.market.entity.Agriculture;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AgricultureInfoResponse {
    @Schema(description = "농산물 이름", example = "수박")
    private String agricultureName;
    @Schema(description = "농산물 정보", example = "달달한 수박입니다.")
    private String agricultureContent;

    public static AgricultureInfoResponse create(Agriculture agriculture){
        return AgricultureInfoResponse.builder()
                .agricultureName(agriculture.getAgricultureName())
                .agricultureContent(agriculture.getAgricultureContent())
                .build();
    }
}
