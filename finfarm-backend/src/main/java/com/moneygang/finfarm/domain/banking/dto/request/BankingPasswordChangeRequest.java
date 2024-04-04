package com.moneygang.finfarm.domain.banking.dto.request;

import lombok.Getter;

@Getter
public class BankingPasswordChangeRequest {
    private String originPassword; // 기존 비밀번호를 확인하는 값
    private String changePassword; // 변경 비밀번호 값
    private String checkPassword; // 변경 비밀번호 확인 값
}