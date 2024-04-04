package com.moneygang.finfarm.domain.banking.dto.general;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BankingAccountRemitMember {

    private Long memberPk;
    private String nickname;
    private String imageUrl;
    private LocalDateTime requestTime;

    public static BankingAccountRemitMember create(Long memberPk, String nickname, String imageUrl, LocalDateTime requestTime) {
        return BankingAccountRemitMember.builder()
                .memberPk(memberPk)
                .nickname(nickname)
                .imageUrl(imageUrl)
                .requestTime(requestTime)
                .build();
    }
}
