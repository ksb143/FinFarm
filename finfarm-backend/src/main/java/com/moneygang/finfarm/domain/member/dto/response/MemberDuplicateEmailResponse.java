package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDuplicateEmailResponse {
    private boolean isExist;

    public static MemberDuplicateEmailResponse create(boolean isExist) {
        return MemberDuplicateEmailResponse.builder()
                .isExist(isExist)
                .build();
    }
}
