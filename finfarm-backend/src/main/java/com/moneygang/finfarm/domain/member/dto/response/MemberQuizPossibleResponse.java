package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberQuizPossibleResponse {
    Boolean isPossible;

    public static MemberQuizPossibleResponse create(Boolean isPossible){
        return MemberQuizPossibleResponse.builder()
                .isPossible(isPossible)
                .build();
    }
}
