package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingMemberSearchResponse {
    private Long memberPk;
    private String nickname;
    private String imageUrl;

    public static BankingMemberSearchResponse create(Long memberPk, String nickname, String imageUrl) {
        return BankingMemberSearchResponse.builder()
                .memberPk(memberPk)
                .nickname(nickname)
                .imageUrl(imageUrl)
                .build();
    }
}
