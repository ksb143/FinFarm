package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberReissueResponse {
    private String accessToken;

    public static MemberReissueResponse create(String accessToken) {
        return MemberReissueResponse.builder()
                .accessToken(accessToken)
                .build();
    }
}
