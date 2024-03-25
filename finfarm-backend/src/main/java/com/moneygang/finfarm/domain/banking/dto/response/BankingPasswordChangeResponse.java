package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingPasswordChangeResponse {

    private Boolean isSuccess;

    public static BankingPasswordChangeResponse create(Boolean isSuccess) {
        return BankingPasswordChangeResponse.builder()
                .isSuccess(isSuccess)
                .build();
    }
}
