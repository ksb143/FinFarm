package com.moneygang.finfarm.domain.banking.repository;

import com.moneygang.finfarm.domain.banking.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<Account, Long> {
}
