package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanRepayResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanTakeResponse;
import org.springframework.http.ResponseEntity;

public interface LoanHistoryService {

    public void getLoanHistory();

    public ResponseEntity<BankingLoanTakeResponse> loan(long memberPk, long loanPk, long amount, int accountPassword);

    public void loanAudit();

    public ResponseEntity<BankingLoanRepayResponse> loanRepay(long memberPk, long loanHistoryPk, long amount, int accountPassword);
}
