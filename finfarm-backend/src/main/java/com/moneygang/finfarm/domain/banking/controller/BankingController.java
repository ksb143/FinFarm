package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/banking")
@RequiredArgsConstructor
public class BankingController {

    private final AccountService accountService;

    @PostMapping("/account/deposit")
    public void deposit() {

    }

    @PostMapping("/account/withdraw")
    public void withdraw() {

    }

    @PostMapping("/account/remit")
    public void remit() {
        
    }
}
