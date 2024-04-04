package com.moneygang.finfarm.domain.market.dto.detail;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberItemsDTO {
    @Schema(description = "씨앗 정보")
    private List<SeedInfo> seeds;
    @Schema(description = "농산물 정보")
    private List<AgricultureInfo> agricultures;

    public static MemberItemsDTO create(List<SeedInfo> seeds, List<AgricultureInfo> agricultures){
        return MemberItemsDTO.builder()
                .seeds(seeds)
                .agricultures(agricultures)
                .build();
    }
}
