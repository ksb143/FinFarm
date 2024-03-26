package com.moneygang.finfarm.domain.banking.dto.response;

import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountDetail;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class BankingAccountResponse {
    private Long accountBalance;
    private LocalDate openDate;
    private List<BankingAccountDetail> bankingAccountDetailList;

    public static BankingAccountResponse create(Long accountBalance, LocalDate openDate, List<BankingAccountDetail> bankingAccountDetailList) {
        return BankingAccountResponse.builder()
                .accountBalance(accountBalance)
                .openDate(openDate)
                .bankingAccountDetailList(bankingAccountDetailList)
                .build();
    }
}
