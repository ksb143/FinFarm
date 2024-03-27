package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberMypageResponse {
    private String memberNickname;
    private String memberImageUrl;

    public static MemberMypageResponse create(String memberNickname, String memberImageUrl) {
        return MemberMypageResponse.builder()
                .memberNickname(memberNickname)
                .memberImageUrl(memberImageUrl)
                .build();
    }
}
