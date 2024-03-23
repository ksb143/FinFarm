package com.moneygang.finfarm.domain.banking.dto.response;

import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountRemitUser;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class BankingAccountRemitRecentResponse {

    List<BankingAccountRemitUser> recentRemitUsers = new ArrayList<>();

    public static BankingAccountRemitRecentResponse create() {
        return BankingAccountRemitRecentResponse.builder().build();
    }

    public void addUser(BankingAccountRemitUser user) {
        this.recentRemitUsers.add(user);
    }
}
