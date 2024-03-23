package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountDepositRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountWithdrawRequest;
import com.moneygang.finfarm.domain.banking.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/banking")
@RequiredArgsConstructor
public class BankingController {

    private final AccountService accountService;

    @PostMapping("/account/deposit")
    public void deposit(@RequestBody BankingAccountDepositRequest request) {

    }

    @PostMapping("/account/withdraw")
    public void withdraw(@RequestBody BankingAccountWithdrawRequest request) {

    }

    @PostMapping("/account/remit")
    public void remit() {

    }
}
