package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberLoginResponse {
    private String accessToken;
    private String memberNickname;
    private boolean memberSolveQuiz;
    private Long memberCurPoint;
    private String memberImageUrl;
    private boolean isMember;

    public static MemberLoginResponse create(String accessToken, String memberNickname, boolean memberSolveQuiz, Long memberCurPoint, String memberImageUrl, boolean isMember) {
        return MemberLoginResponse.builder()
                .accessToken(accessToken)
                .memberNickname(memberNickname)
                .memberSolveQuiz(memberSolveQuiz)
                .memberCurPoint(memberCurPoint)
                .memberImageUrl(memberImageUrl)
                .isMember(isMember)
                .build();
    }
}
