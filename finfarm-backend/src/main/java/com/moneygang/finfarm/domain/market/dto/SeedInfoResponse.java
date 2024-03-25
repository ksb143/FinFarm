package com.moneygang.finfarm.domain.market.dto;

import com.moneygang.finfarm.domain.market.entity.Seed;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeedInfoResponse {
    @Schema(description = "씨앗 이름", example = "씨감자")
    private String seedName;
    @Schema(description = "씨앗 정보", example = "감자 씨앗 입니다.")
    private String seedContent;
    @Schema(description = "씨앗 재배 기간", example = "365")
    private Long seedPeriod;

    public static SeedInfoResponse create(Seed seed){
        return SeedInfoResponse.builder()
                .seedName(seed.getSeedName())
                .seedContent(seed.getSeedContent())
                .seedPeriod(seed.getSeedPeriod())
                .build();
    }
}
