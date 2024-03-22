package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberJoinResponse {
    private String message;

    public static MemberJoinResponse create(String message) {
        return MemberJoinResponse.builder()
                .message(message)
                .build();
    }
}
