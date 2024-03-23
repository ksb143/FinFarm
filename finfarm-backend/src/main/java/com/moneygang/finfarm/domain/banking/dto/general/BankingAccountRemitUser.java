package com.moneygang.finfarm.domain.banking.dto.general;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingAccountRemitUser {

//    private Long userId;
    private String nickname;
    private String imageUrl;

    public static BankingAccountRemitUser create(String nickname, String imageUrl) {
        return BankingAccountRemitUser.builder()
//                .userId(userId)
                .nickname(nickname)
                .imageUrl(imageUrl)
                .build();
    }
}
