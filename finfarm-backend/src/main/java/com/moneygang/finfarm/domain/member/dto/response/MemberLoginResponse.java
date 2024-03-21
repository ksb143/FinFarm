package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberLoginResponse {
    private String accessToken;
    private String refreshToken;
    private String memberNickname;
    private boolean memberSolveQuiz;
    private Long memberCurPoint;
    private String memberImageUrl;

    public static MemberLoginResponse create(String accessToken, String refreshToken, String memberNickname, boolean memberSolveQuiz, Long memberCurPoint, String memberImageUrl) {
        return MemberLoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .memberNickname(memberNickname)
                .memberSolveQuiz(memberSolveQuiz)
                .memberCurPoint(memberCurPoint)
                .memberImageUrl(memberImageUrl)
                .build();
    }
}
