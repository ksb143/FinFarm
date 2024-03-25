package com.moneygang.finfarm.domain.banking.service;


import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountRemitMember;
import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountDepositRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountRemitRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingAccountWithdrawRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingPasswordChangeRequest;
import com.moneygang.finfarm.domain.banking.dto.response.*;
import com.moneygang.finfarm.domain.banking.entity.Account;
import com.moneygang.finfarm.domain.banking.repository.AccountRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final CommonUtil commonUtil;

    /**
     * 입금 서비스
     */
    @Override
    @Transactional
    public ResponseEntity<BankingAccountDepositResponse> deposit(BankingAccountDepositRequest request) {
        Member member = commonUtil.getMember();

        long amount = request.getAmount();

        // 예외1: 입금 요청 금액보다 보유 포인트가 적은 경우
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

    /**
     * 출금 서비스
     */
    @Override
    @Transactional
    public ResponseEntity<BankingAccountWithdrawResponse> withdraw(BankingAccountWithdrawRequest request) {
        Member member = commonUtil.getMember();

        long amount = request.getAmount();
        int accountPassword = request.getAccountPassword();
        long accountBalance = getAccountBalance(member.getMemberPk());

        // 예외2: 출금 요청 금액보다 보유 계좌 잔고가 적은 경우 (400)
        if(amount > accountBalance) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Account Balance");
        }

        // 예외3: 입력 비밀번호가 유저의 비밀번호와 다른 경우 (401)
        if(!String.valueOf(accountPassword).equals(member.getMemberAccountPassword())) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "Password Not Match");
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

    /**
     * 최근 송금한 (6명) 사용자 조회 서비스
     */
    @Override
    public ResponseEntity<BankingAccountRemitRecentResponse> recentRemitMembers() {
        Member member = commonUtil.getMember();

        List<Account> remits = member.getAccountList()
                .stream()
                .filter(a -> a.getAccountType().equals("송금")) // 송금 내역 필터링
                .sorted(Comparator.comparing(Account::getAccountDate).reversed()) // 최신순 정렬
                .collect(Collectors.toList());

        BankingAccountRemitRecentResponse response = BankingAccountRemitRecentResponse.create();

        int count = 0;
        HashSet<String> remitMemberNicknames = new HashSet<>(); // 서로 다른 사용자 6명을 구분하기 위한 Set 자료구조
        for(Account remit: remits) {
            if(count==6) break;

            String otherMemberNickname = remit.getAccountNickname();
            Optional<Member> optionalOtherMember = memberRepository.findByMemberNickname(otherMemberNickname);

            if(optionalOtherMember.isEmpty()) {
                throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
            }

            if(!remitMemberNicknames.contains(otherMemberNickname)) {
                remitMemberNicknames.add(otherMemberNickname);

                Member otherMember = optionalOtherMember.get();
                String otherMemberImageUrl = otherMember.getMemberImageUrl();
                Long otherMemberPk = otherMember.getMemberPk();

                BankingAccountRemitMember remitMember = BankingAccountRemitMember.create(otherMemberPk, otherMemberNickname, otherMemberImageUrl);
                response.addMember(remitMember);

                count++;
            }
        }

        return ResponseEntity.ok(response);
    }

    /**
     * 닉네임으로 사용자 조회 서비스
     * @param nickname
     * @return
     */
    @Override
    public ResponseEntity<BankingSearchMemberResponse> searchMember(String nickname) {

        Optional<Member> optionalSearchMembers = memberRepository.findByMemberNickname(nickname);

        if(optionalSearchMembers.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member Not Found");
        }

        Member searchMember = optionalSearchMembers.get();
        BankingSearchMemberResponse response = BankingSearchMemberResponse.create(
                searchMember.getMemberPk(),
                searchMember.getMemberNickname(),
                searchMember.getMemberImageUrl());

        return ResponseEntity.ok(response);
    }

    /**
     * 송금 서비스
     */
    @Override
    @Transactional
    public ResponseEntity<BankingAccountRemitResponse> remit(BankingAccountRemitRequest request) {

        Member sendMember = commonUtil.getMember();
        Optional<Member> optionalReceiveMember = memberRepository.findById(request.getOtherUserPk());

        // 예외1: 송금할 사용자가 없을 때 (404)
        if(optionalReceiveMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Received Member Not Found");
        }

        Member receiveMember = optionalReceiveMember.get();

        long amount = request.getAmount();
        long accountPassword = request.getAccountPassword();
        long accountBalance = getAccountBalance(sendMember.getMemberPk());

        // 예외2: 송금 요청 금액보다 보유 계좌 잔고가 적은 경우 (400)
        if(amount > accountBalance) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Account Balance");
        }

        // 예외3: 입력 비밀번호가 유저의 비밀번호와 다른 경우 (401)
        if(!String.valueOf(accountPassword).equals(sendMember.getMemberAccountPassword())) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "Password Not Match");
        }

        Account sendRemit = Account.builder()
                .amount((-1)*amount)
                .type("송금")
                .nickname(sendMember.getMemberNickname())
                .member(sendMember)
                .build();

        Account receiveRemit = Account.builder()
                .amount(amount)
                .type("송금")
                .nickname(receiveMember.getMemberNickname())
                .member(receiveMember)
                .build();

        accountRepository.save(sendRemit);
        accountRepository.save(receiveRemit);

        accountBalance = getAccountBalance(sendMember.getMemberPk());
        LocalDateTime requestTime = sendRemit.getAccountDate();

        BankingAccountRemitResponse response = BankingAccountRemitResponse.create(accountBalance, requestTime);

        return ResponseEntity.ok(response);
    }

    /**
     * 계좌 비밀번호 변경 서비스
     */
    @Override
    @Transactional
    public ResponseEntity<BankingPasswordChangeResponse> changePassword(BankingPasswordChangeRequest request) {

        Member member = commonUtil.getMember();

        Integer changePassword = request.getChangePassword();
        Integer checkPassword = request.getCheckPassword();
        Integer originPassword = request.getOriginPassword();

        String accountPassword = member.getMemberAccountPassword();
        String changePasswordToStr = String.valueOf(changePassword);
        String checkPasswordToStr = String.valueOf(checkPassword);

        // 예외2: 확인 비밀번호가 유저의 비밀번호와 다른 경우 (401)
        if(!String.valueOf(originPassword).equals(accountPassword)) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Password Not Match");
        }

        String pattern = "^\\\\d{4}$"; // 4자리 숫자 형태의 정규 표현식
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher1 = regex.matcher(changePasswordToStr);
        Matcher matcher2 = regex.matcher(checkPasswordToStr);

        // 예외3: 변경할 비밀번호 형식이 안맞을 떄
        if(!matcher1.matches()||!matcher2.matches()) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "Not Match Input Format");
        }

        // 예외4: 변경 비밀번호와 변경 확인 비밀번호가 다를 때
        if(!changePasswordToStr.equals(checkPasswordToStr)) {
            throw new GlobalException(HttpStatus.PAYMENT_REQUIRED, "Check Password Not Match");
        }

        // 예외5: 변경할 비밀번호가 기존 비밀번호랑 같을 때
        if(changePasswordToStr.equals(accountPassword)) {
            throw new GlobalException(HttpStatus.FORBIDDEN, "Same Password");
        }

        member.changeAccountPassword(changePasswordToStr);
        BankingPasswordChangeResponse response = BankingPasswordChangeResponse.create(true);

        return ResponseEntity.ok(response);
    }


    /** 사용자의 계좌 잔액 조회 함수 **/
    @Override
    public long getAccountBalance(long memberPk) {

        Optional<Member> optionalMember = memberRepository.findById(memberPk);

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
