package com.moneygang.finfarm.domain.market.dto;

import com.moneygang.finfarm.domain.market.entity.Seed;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeedInfoResponse {
    private String seedName;
    private String seedContent;
    private Long seedPeriod;

    public static SeedInfoResponse create(Seed seed){
        return SeedInfoResponse.builder()
                .seedName(seed.getSeedName())
                .seedContent(seed.getSeedContent())
                .seedPeriod(seed.getSeedPeriod())
                .build();
    }
}
