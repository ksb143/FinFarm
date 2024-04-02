package com.moneygang.finfarm.domain.banking.service;

import com.moneygang.finfarm.domain.banking.entity.Loan;
import com.moneygang.finfarm.domain.banking.repository.LoanRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;

    @Override
    public void makeLoan(Loan loan) {
        loanRepository.save(loan);
    }

    @Override
    public void removeLoan(Long loanPk) {
        Loan loan = loanRepository.findById(loanPk)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "load not found"));
        loanRepository.delete(loan);
    }
}
