package com.moneygang.finfarm.domain.banking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankingLoanAuditResponse {

    private Boolean canLoan; // 대출 받을 수 있는지
    private Boolean isCurrentlyLoan; // 현재 대출 중인지
    private Boolean haveOverDue; // 연체 내역 여부

    public static BankingLoanAuditResponse create(Boolean canLoan, Boolean isCurrentlyLoan, Boolean haveOverDue) {
        return BankingLoanAuditResponse.builder()
                .canLoan(canLoan)
                .isCurrentlyLoan(isCurrentlyLoan)
                .haveOverDue(haveOverDue)
                .build();
    }
}
