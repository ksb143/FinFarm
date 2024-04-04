package com.moneygang.finfarm.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class MemberAutoLoginResponse {
    private String memberNickname;
    private boolean memberSolveQuiz;
    private LocalDate memberSolveQuizTime;
    private Long memberCurPoint;
    private String memberImageUrl;

    public static MemberAutoLoginResponse create(String memberNickname, boolean memberSolveQuiz, LocalDate memberSolveQuizTime,  Long memberCurPoint, String memberImageUrl) {
        return MemberAutoLoginResponse.builder()
                .memberNickname(memberNickname)
                .memberSolveQuiz(memberSolveQuiz)
                .memberSolveQuizTime(memberSolveQuizTime)
                .memberCurPoint(memberCurPoint)
                .memberImageUrl(memberImageUrl)
                .build();
    }
}
