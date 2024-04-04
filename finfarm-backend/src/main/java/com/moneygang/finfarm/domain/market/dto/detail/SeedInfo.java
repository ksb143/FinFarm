package com.moneygang.finfarm.domain.market.dto.detail;

import com.moneygang.finfarm.domain.market.entity.Seed;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeedInfo {
    @Schema(description = "씨앗 이름", example = "씨감자")
    private String seedName;
    @Schema(description = "씨앗 재배기간", example = "345")
    private Long seedPeriod;
    @Schema(description = "씨앗 정보", example = "감자씨앗입니다.")
    private String seedContent;
    @Schema(description = "보유한 씨앗 개수", example = "4")
    private Integer seedAmount;

    public static SeedInfo create(Seed seed, Integer amount){
        return SeedInfo.builder()
                .seedName(seed.getSeedName())
                .seedPeriod(seed.getSeedPeriod())
                .seedContent(seed.getSeedContent())
                .seedAmount(amount)
                .build();
    }
}
