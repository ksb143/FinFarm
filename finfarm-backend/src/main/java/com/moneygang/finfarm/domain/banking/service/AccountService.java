package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.dto.request.*;
import com.moneygang.finfarm.domain.banking.dto.response.*;
import org.springframework.http.ResponseEntity;

public interface AccountService {

    // 계좌 내역 조회
    ResponseEntity<BankingAccountResponse> getAccountHistory(BankingAccountRequest request);

    // 계좌 입금
    ResponseEntity<BankingAccountDepositResponse> deposit(BankingAccountDepositRequest request);

    // 계좌 출금
    ResponseEntity<BankingAccountWithdrawResponse> withdraw(BankingAccountWithdrawRequest request);

    // 최근 이체 내역 조회
    ResponseEntity<BankingAccountRemitRecentResponse> recentRemitMembers();

    // 사용자 닉네임 검색
    ResponseEntity<BankingMemberSearchResponse> searchMember(BankingMemberSearchRequest request);

    // 계좌 송금 (다른 사람에게)
    ResponseEntity<BankingAccountRemitResponse> remit(BankingAccountRemitRequest request);

    // 계좌 비밀번호 수정
    ResponseEntity<BankingPasswordChangeResponse> changePassword(BankingPasswordChangeRequest request);

    // 계좌 잔액 조회 (api용)
    ResponseEntity<BankingAccountBalanceResponse> showAccountBalance();

    // 계좌 잔액 조회
    long getAccountBalance(long memberPk);
}
