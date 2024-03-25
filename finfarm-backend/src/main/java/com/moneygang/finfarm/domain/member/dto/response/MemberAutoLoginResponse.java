package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberAutoLoginResponse {
    private String memberNickname;
    private boolean memberSolveQuiz;
    private Long memberCurPoint;
    private String memberImageUrl;

    public static MemberAutoLoginResponse create(String memberNickname, boolean memberSolveQuiz, Long memberCurPoint, String memberImageUrl) {
        return MemberAutoLoginResponse.builder()
                .memberNickname(memberNickname)
                .memberSolveQuiz(memberSolveQuiz)
                .memberCurPoint(memberCurPoint)
                .memberImageUrl(memberImageUrl)
                .build();
    }
}
