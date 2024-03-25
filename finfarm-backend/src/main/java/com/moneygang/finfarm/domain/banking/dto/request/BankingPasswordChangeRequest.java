package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingPasswordChangeRequest {
    private Integer originPassword; // 기존 비밀번호를 확인하는 값
    private Integer changePassword; // 변경 비밀번호 값
    private Integer checkPassword; // 변경 비밀번호 확인 값
}
