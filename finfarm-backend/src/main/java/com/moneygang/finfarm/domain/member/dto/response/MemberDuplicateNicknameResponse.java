package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDuplicateNicknameResponse {
    private boolean isExist;

    public static MemberDuplicateNicknameResponse create(boolean isExist) {
        return MemberDuplicateNicknameResponse.builder()
                .isExist(isExist)
                .build();
    }
}
