package com.moneygang.finfarm.domain.banking.service;

public interface AccountService {

    // 계좌 입금
    public void deposit(long amount);

    // 계좌 송금
    public void withdraw(long amount, int accountPassword);

    // 계좌 이체 (다른 사람에게)
    public void remit(long amount, int accountPassword, String otherNickname);
}
