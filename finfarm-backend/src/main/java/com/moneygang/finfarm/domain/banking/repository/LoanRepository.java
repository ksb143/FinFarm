package com.moneygang.finfarm.domain.banking.repository;

import com.moneygang.finfarm.domain.banking.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
