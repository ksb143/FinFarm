package com.moneygang.finfarm.domain.banking.repository;

import com.moneygang.finfarm.domain.banking.entity.LoanHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanHistoryRepository extends JpaRepository<LoanHistory, Long> {
}
