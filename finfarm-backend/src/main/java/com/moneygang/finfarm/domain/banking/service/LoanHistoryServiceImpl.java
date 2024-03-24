package com.moneygang.finfarm.domain.banking.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanHistoryServiceImpl implements LoanHistoryService {


}
