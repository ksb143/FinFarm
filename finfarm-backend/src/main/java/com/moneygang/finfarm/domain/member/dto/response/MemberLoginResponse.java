package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberLoginResponse {
    private String accessToken;
    private String refreshToken;

    public static MemberLoginResponse createMemberLoginResponse(String accessToken, String refreshToken) {
        return MemberLoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
