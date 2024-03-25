package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.dto.request.*;
import com.moneygang.finfarm.domain.banking.dto.response.*;
import com.moneygang.finfarm.domain.banking.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/banking/account")
@RequiredArgsConstructor
public class BankingAccountController {

    private final AccountService accountService;

    @PostMapping("/deposit")
    public ResponseEntity<BankingAccountDepositResponse> deposit(@RequestBody BankingAccountDepositRequest request) {
        return accountService.deposit(request);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<BankingAccountWithdrawResponse> withdraw(@RequestBody BankingAccountWithdrawRequest request) {
        return accountService.withdraw(request);
    }

    @GetMapping("/remit/recent")
    public ResponseEntity<BankingAccountRemitRecentResponse> recentRemitMembers() {
        return accountService.recentRemitMembers();
    }

    @GetMapping("/remit")
    public ResponseEntity<BankingMemberSearchResponse> searchMemberForRemit(@RequestBody BankingMemberSearchRequest request) {
        return accountService.searchMember(request);
    }

    @PostMapping("/remit")
    public ResponseEntity<BankingAccountRemitResponse> remit(@RequestBody BankingAccountRemitRequest request) {
        return accountService.remit(request);
    }

    @PutMapping("/password")
    public ResponseEntity<BankingPasswordChangeResponse> changePassword(@RequestBody BankingPasswordChangeRequest request) {
        return accountService.changePassword(request);
    }
}
