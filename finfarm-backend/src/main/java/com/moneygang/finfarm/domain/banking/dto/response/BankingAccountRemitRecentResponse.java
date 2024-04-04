package com.moneygang.finfarm.domain.banking.dto.response;

import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountRemitMember;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class BankingAccountRemitRecentResponse {

    List<BankingAccountRemitMember> recentRemitMembers;

    public static BankingAccountRemitRecentResponse create() {
        return BankingAccountRemitRecentResponse.builder()
                        .recentRemitMembers(new ArrayList<>())
                        .build();
    }

    public void addMember(BankingAccountRemitMember member) {
        this.recentRemitMembers.add(member);
    }
}
