package com.moneygang.finfarm.domain.banking.dto.response;

import com.moneygang.finfarm.domain.banking.dto.general.BankingLoanHistory;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BankingLoanResponse {

    private BankingLoanHistory currentLoan;
    private List<BankingLoanHistory> pastLoans;
    private Long totalTakeAmount;
    private Long totalRepayAmount;

//    public static BankingLoanResponse create() {
//
//    }
}
