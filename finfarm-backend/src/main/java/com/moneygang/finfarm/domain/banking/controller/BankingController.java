package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.dto.request.BankingPasswordChangeRequest;
import com.moneygang.finfarm.domain.banking.dto.response.BankingPasswordChangeResponse;
import com.moneygang.finfarm.domain.banking.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/banking")
@RequiredArgsConstructor
public class BankingController {

    private final AccountService accountService;

    @PutMapping("/password")
    public ResponseEntity<BankingPasswordChangeResponse> changePassword(@RequestBody BankingPasswordChangeRequest request) {
        int originPassword = request.getOriginPassword();
        int changePassword = request.getChangePassword();
        int checkPassword = request.getCheckPassword();

        return accountService.changePassword(1, originPassword, changePassword, checkPassword);
    }
}
