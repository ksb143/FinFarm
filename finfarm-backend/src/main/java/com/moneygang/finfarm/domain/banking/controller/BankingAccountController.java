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
@RequestMapping("/banking/account")
@RequiredArgsConstructor
public class BankingAccountController {

    private final AccountService accountService;

    @PostMapping("/deposit")
    public void deposit(@RequestBody BankingAccountDepositRequest request) {

    }

    @PostMapping("/withdraw")
    public void withdraw(@RequestBody BankingAccountWithdrawRequest request) {

    }

    @PostMapping("/remit")
    public void remit() {

    }
}
