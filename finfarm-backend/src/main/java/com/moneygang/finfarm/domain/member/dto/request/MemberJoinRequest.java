package com.moneygang.finfarm.domain.member.dto.request;

import lombok.Getter;

@Getter
public class MemberJoinRequest {
    private String memberEmail;
    private String memberNickname;
    private String memberAccountPassword;
    private String memberImageUrl;
}