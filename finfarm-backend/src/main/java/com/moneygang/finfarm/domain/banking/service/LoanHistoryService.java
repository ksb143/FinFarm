package com.moneygang.finfarm.domain.banking.service;

public interface LoanHistoryService {

    public void getLoanHistory();

    public void loan(long memberPk, long loanPk, long amount, int accountPassword);

    public void loanAudit();

    public void loanRepay();
}
