package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberProfileResponse {
    private String memberImageUrl;

    public static MemberProfileResponse create(String memberImageUrl) {
        return MemberProfileResponse.builder()
                .memberImageUrl(memberImageUrl)
                .build();
    }
}
