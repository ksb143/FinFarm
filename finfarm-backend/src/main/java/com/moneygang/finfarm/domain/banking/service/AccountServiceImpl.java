package com.moneygang.finfarm.domain.banking.service;


import com.moneygang.finfarm.domain.banking.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public void deposit(long amount) {

    }

    @Override
    public void withdraw(long amount, int accountPassword) {

    }

    @Override
    public void remit(long amount, int accountPassword, String otherNickname) {

    }
}
