package com.moneygang.finfarm.domain.market.dto.detail;

import lombok.Builder;

import java.util.List;

@Builder
public class MemberItemsDTO {
    private List<SeedInfo> seeds;
    private List<AgricultureInfo> agricultures;

    public static MemberItemsDTO creatememberItemsDTO(List<SeedInfo> seeds, List<AgricultureInfo> agricultures){
        return MemberItemsDTO.builder()
                .seeds(seeds)
                .agricultures(agricultures)
                .build();
    }
}
