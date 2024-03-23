package com.moneygang.finfarm.domain.banking.service;


import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountDepositResponse;
import com.moneygang.finfarm.domain.banking.entity.Account;
import com.moneygang.finfarm.domain.banking.repository.AccountRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public ResponseEntity<BankingAccountDepositResponse> deposit(long userId, long amount) {
        Optional<Member> optionalMember = memberRepository.findById(userId);

        if(optionalMember.isPresent()) {
            Account deposit = Account.builder()
                    .amount(amount)
                    .type("입금")
                    .nickname("임시 닉네임")
                    .member(optionalMember.get())
                    .build();

            BankingAccountDepositResponse response = BankingAccountDepositResponse.builder()
                    .point(deposit.getAccountAmount())
                    .remainAmount(deposit.getAccountBalance())
                    .requestTime(deposit.getAccountDate())
                    .build();

            return ResponseEntity.ok(response);
        }
        else throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
    }

    @Override
    @Transactional
    public void withdraw(long userId, int accountPassword, long amount) {

    }

    @Override
    @Transactional
    public void remit(long userId, int accountPassword, String otherNickname, long amount) {

    }
}
