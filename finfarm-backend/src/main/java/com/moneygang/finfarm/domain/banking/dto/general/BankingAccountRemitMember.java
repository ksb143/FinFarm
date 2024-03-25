package com.moneygang.finfarm.domain.banking.dto.general;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingAccountRemitMember {

    private Long memberPk;
    private String nickname;
    private String imageUrl;

    public static BankingAccountRemitMember create(Long memberPk, String nickname, String imageUrl) {
        return BankingAccountRemitMember.builder()
                .memberPk(memberPk)
                .nickname(nickname)
                .imageUrl(imageUrl)
                .build();
    }
}
