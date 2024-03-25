package com.moneygang.finfarm.domain.market.dto.detail;

import com.moneygang.finfarm.domain.market.entity.Seed;
import lombok.Builder;

@Builder
public class SeedInfo {
    private String seedName;
    private Long seedPeriod;
    private String seedContent;
    private Integer seedAmount;

    public static SeedInfo createSeedInfo(Seed seed, Integer amount){
        return SeedInfo.builder()
                .seedName(seed.getSeedName())
                .seedPeriod(seed.getSeedPeriod())
                .seedContent(seed.getSeedContent())
                .seedAmount(amount)
                .build();
    }
}
