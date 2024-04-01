package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class MemberLoginResponse {
    private String accessToken;
    private String memberEmail;
    private String memberNickname;
    private boolean memberSolveQuiz;
    private LocalDate memberSolveQuizTime;
    private Long memberCurPoint;
    private String memberImageUrl;
    private LocalDate memberCreateDate;
    private boolean isMember;

    public static MemberLoginResponse create(String accessToken, String memberEmail, String memberNickname, boolean memberSolveQuiz, LocalDate memberSolveQuizTime,  Long memberCurPoint, String memberImageUrl, LocalDate memberCreateDate, boolean isMember) {
        return MemberLoginResponse.builder()
                .accessToken(accessToken)
                .memberEmail(memberEmail)
                .memberNickname(memberNickname)
                .memberSolveQuiz(memberSolveQuiz)
                .memberSolveQuizTime(memberSolveQuizTime)
                .memberCurPoint(memberCurPoint)
                .memberImageUrl(memberImageUrl)
                .memberCreateDate(memberCreateDate)
                .isMember(isMember)
                .build();
    }
}
