package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingSearchMemberResponse {
    private Long memberPk;
    private String nickname;
    private String imageUrl;

    public static BankingSearchMemberResponse create(Long memberPk, String nickname, String imageUrl) {
        return BankingSearchMemberResponse.builder()
                .memberPk(memberPk)
                .nickname(nickname)
                .imageUrl(imageUrl)
                .build();
    }
}
