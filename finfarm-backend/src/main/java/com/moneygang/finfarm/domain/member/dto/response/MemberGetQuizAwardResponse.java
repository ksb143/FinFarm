package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberGetQuizAwardResponse {
    Long curPoint;

    public static MemberGetQuizAwardResponse create(Long point){
        return MemberGetQuizAwardResponse.builder()
                 .curPoint(point)
                 .build();
    }
}
