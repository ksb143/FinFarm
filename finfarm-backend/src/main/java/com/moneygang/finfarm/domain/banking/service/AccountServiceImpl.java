package com.moneygang.finfarm.domain.banking.service;


import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountRemitUser;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountDepositResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountRemitRecentResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingAccountWithdrawResponse;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        // 예외1: 해당 사용자가 없을 때
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }

        Member member = optionalMember.get();

        // 예외2: 입금 요청 금액보다 보유 포인트가 적은 경우
        if(amount > member.getMemberCurPoint()) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Current Point");
        }

        Account deposit = Account.builder()
                .amount(amount)
                .type("입금")
                .nickname(member.getMemberNickname())
                .member(member)
                .build();

        accountRepository.save(deposit);
        member.updateCurPoint(amount);

        Long curPoint = member.getMemberCurPoint();
        Long accountBalance = getAccountBalance(member.getMemberPk());
        LocalDateTime requestTime = deposit.getAccountDate();

        BankingAccountDepositResponse response = BankingAccountDepositResponse.create(curPoint, accountBalance, requestTime);

        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional
    public ResponseEntity<BankingAccountWithdrawResponse> withdraw(long userId, int accountPassword, long amount) {
        Optional<Member> optionalMember = memberRepository.findById(userId);

        // 예외1: 해당 사용자가 없을 때 (404)
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }

        Member member = optionalMember.get();
        long accountBalance = getAccountBalance(member.getMemberPk());

        // 예외2: 출금 요청 금액보다 보유 계좌 잔고가 적은 경우 (400)
        if(amount > accountBalance) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Account Balance");
        }

        // 예외 3: 입력 비밀번호가 유저의 비밀번호와 다른 경우 (401)
        if(String.valueOf(accountPassword).equals(member.getMemberAccountPassword())) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "Wrong Account Password");
        }

        Account withdraw = Account.builder()
                .amount((-1)*amount)
                .type("출금")
                .nickname(member.getMemberNickname())
                .member(member)
                .build();

        accountRepository.save(withdraw);
        member.updateCurPoint(amount);
        Long curPoint = member.getMemberCurPoint();
        accountBalance = getAccountBalance(member.getMemberPk());
        LocalDateTime requestTime = withdraw.getAccountDate();

        BankingAccountWithdrawResponse response = BankingAccountWithdrawResponse.create(curPoint, accountBalance, requestTime);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BankingAccountRemitRecentResponse> recentRemitUsers(long userId) {
        Optional<Member> optionalMember = memberRepository.findById(userId);

        // 예외1: 해당 사용자가 없을 때 (404)
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }

        Member member = optionalMember.get();
        List<Account> remits = member.getAccountList()
                .stream()
                .filter(a -> a.getAccountType().equals("송금")) // 송금 내역 필터링
                .sorted(Comparator.comparing(Account::getAccountDate).reversed()) // 최신순 정렬
                .collect(Collectors.toList());

        BankingAccountRemitRecentResponse response = BankingAccountRemitRecentResponse.create();

        int count = 0;
        for(Account remit: remits) {
            if(count==6) break;

            /**
             * 상대방의 이미지를 가져오려면 상대방의 pk 값을 가지고 있어야 함 (논의 필요)
             */
            BankingAccountRemitUser user = BankingAccountRemitUser.create(remit.getAccountNickname(), "testImage.img");
            response.addUser(user);

            count++;
        }

        return ResponseEntity.ok(response);
    }

    @Override
    public void searchUser(String nickname) {

    }

    @Override
    @Transactional
    public void remit(long myUserId, long otherUserId, int accountPassword, long amount) {

    }

    /** 사용자의 계좌 잔액 조회 **/
    public long getAccountBalance(long userId) {

        Optional<Member> optionalMember = memberRepository.findById(userId);

        // 예외: 해당 사용자가 없을 때
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }

        Member member = optionalMember.get();
        List<Account> accountList = member.getAccountList();
        long accountBalance = 0;

        for(Account account: accountList) {
            accountBalance += account.getAccountAmount();
        }

        return accountBalance;
    }
}
