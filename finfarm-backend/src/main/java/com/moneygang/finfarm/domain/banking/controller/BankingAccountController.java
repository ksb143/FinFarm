package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountDepositRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountWithdrawRequest;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountDepositResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountRemitRecentResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountWithdrawResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingSearchMemberResponse;
import com.moneygang.finfarm.domain.banking.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/banking/account")
@RequiredArgsConstructor
public class BankingAccountController {

    private final AccountService accountService;

    @PostMapping("deposit")
    public ResponseEntity<BankingAccountDepositResponse> deposit(@RequestBody BankingAccountDepositRequest request) {
        return accountService.deposit(request);
    }

    @PostMapping("withdraw")
    public ResponseEntity<BankingAccountWithdrawResponse> withdraw(@RequestBody BankingAccountWithdrawRequest request) {
        return accountService.withdraw(request);
    }

    @GetMapping("remit/recent")
    public ResponseEntity<BankingAccountRemitRecentResponse> recentRemitMembers() {
        return accountService.recentRemitMembers();
    }

    @GetMapping("remit")
    public void searchMemberForRemit() {
    }

    @PostMapping("remit")
    public void remit() {

    }
}
