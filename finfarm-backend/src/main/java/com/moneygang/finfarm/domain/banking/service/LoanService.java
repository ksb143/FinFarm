package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.entity.Loan;

public interface LoanService {

    public void makeLoan(Loan loan);

    public void updateLoan(Loan loan);

    public void removeLoan(Long loanPk);
}
