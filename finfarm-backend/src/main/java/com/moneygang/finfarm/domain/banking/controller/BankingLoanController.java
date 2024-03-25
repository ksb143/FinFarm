package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.service.LoanHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/banking/loan")
@RequiredArgsConstructor
public class BankingLoanController {

    private final LoanHistoryService loanHistoryService;
}
