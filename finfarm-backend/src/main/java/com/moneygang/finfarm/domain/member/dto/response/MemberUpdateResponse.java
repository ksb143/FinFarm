package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberUpdateResponse {
    private String message;

    public static MemberUpdateResponse create(String message) {
        return MemberUpdateResponse.builder()
                .message(message)
                .build();
    }
}
