package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanAuditRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanRepayRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanTakeRequest;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanAuditResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanRepayResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanTakeResponse;
import org.springframework.http.ResponseEntity;

public interface LoanHistoryService {

    public void getLoanHistory();

    public ResponseEntity<BankingLoanTakeResponse> loan(BankingLoanTakeRequest request);

    public ResponseEntity<BankingLoanAuditResponse> loanAudit(BankingLoanAuditRequest request);

    public ResponseEntity<BankingLoanRepayResponse> loanRepay(BankingLoanRepayRequest request);
}
