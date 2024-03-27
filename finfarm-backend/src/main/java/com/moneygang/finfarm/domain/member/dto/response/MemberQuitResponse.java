package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberQuitResponse {
    private String message;

    public static MemberQuitResponse create(String message) {
        return MemberQuitResponse.builder()
                .message(message)
                .build();
    }
}
