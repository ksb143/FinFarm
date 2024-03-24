package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.repository.LoanHistoryRepository;
import com.moneygang.finfarm.domain.banking.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanHistoryServiceImpl implements LoanHistoryService {

    private final LoanRepository loanRepository;
    private final LoanHistoryRepository loanHistoryRepository;

    @Override
    public void getLoanHistory() {

    }

    @Override
    public void loan() {

    }

    @Override
    public void loanAudit() {

    }

    @Override
    public void loanRepay() {

    }
}
