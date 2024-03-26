package com.moneygang.finfarm.domain.banking.dto.response;

import com.moneygang.finfarm.domain.banking.dto.general.BankingLoanHistory;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class BankingLoanResponse {

    private List<BankingLoanHistory> currentLoans;
    private List<BankingLoanHistory> loanHistories;
    private Long totalTakeAmount;
    private Long totalRepayAmount;

    public static BankingLoanResponse create(List<BankingLoanHistory> currentLoans,
                                             List<BankingLoanHistory> loanHistories,
                                             Long totalTakeAmount, Long totalRepayAmount) {
        return BankingLoanResponse.builder()
                .currentLoans(currentLoans)
                .loanHistories(loanHistories)
                .totalTakeAmount(totalTakeAmount)
                .totalRepayAmount(totalRepayAmount)
                .build();
    }
}
