package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountDepositResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountRemitRecentResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountWithdrawResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingSearchMemberResponse;
import org.springframework.http.ResponseEntity;

public interface AccountService {

    // 계좌 입금
    public ResponseEntity<BankingAccountDepositResponse> deposit(long memberPk, long amount);

    // 계좌 송금
    public ResponseEntity<BankingAccountWithdrawResponse> withdraw(long memberPk, int accountPassword, long amount);

    // 최근 이체 내역 조회
    public ResponseEntity<BankingAccountRemitRecentResponse> recentRemitMembers(long memberPk);

    // 사용자 닉네임 검색
    public ResponseEntity<BankingSearchMemberResponse> searchMember(String nickname);

    // 계좌 이체 (다른 사람에게)
    public void remit(long sendMemberPk, long receiveMemberPk, int accountPassword, long amount);
}
