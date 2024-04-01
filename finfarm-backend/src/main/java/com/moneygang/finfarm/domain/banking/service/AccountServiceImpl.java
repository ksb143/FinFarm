package com.moneygang.finfarm.domain.banking.service;


import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountDetail;
import com.moneygang.finfarm.domain.banking.dto.general.BankingAccountRemitMember;
import com.moneygang.finfarm.domain.banking.dto.request.*;
import com.moneygang.finfarm.domain.banking.dto.response.*;
import com.moneygang.finfarm.domain.banking.entity.Account;
import com.moneygang.finfarm.domain.banking.repository.AccountRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final CommonUtil commonUtil;

    /**
     * 계좌 내역 조회 서비스
     */
    @Override
    public ResponseEntity<BankingAccountResponse> getAccountHistory(BankingAccountRequest request) {
        Member member = commonUtil.getMember();

        List<Account> accountList = member.getAccountList();

        Long accountBalance = getAccountBalance(member.getMemberPk());
        LocalDate openDate = member.getMemberCreateDate();
        List<BankingAccountDetail> bankingAccountDetailList = new ArrayList<>();

        accountLoop:
        for(Account account: accountList) {
            // 필터링1: 거래 타입(입금, 출금 두 가지로 입력 형식 들어옴)
            if(request.getAccountType().equals("deposit")) {
                if(account.getAccountAmount()<0) continue accountLoop;
            } else if(request.getAccountType().equals("withdraw")) {
                if(account.getAccountAmount()>0) continue accountLoop;
            }

            // 필터링2: 적요 내용
            if(!request.getAccountNickname().equals("")) {
                if(!request.getAccountNickname().equals(account.getAccountNickname())) continue accountLoop;
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate startDate = LocalDate.parse(request.getStartDate(), formatter);
            LocalDate endDate = LocalDate.parse(request.getEndDate(), formatter);

            // 필터링3: startDate ~ endDate
            LocalDateTime accountDate = account.getAccountDate();
            if(accountDate.isBefore(startDate.atStartOfDay()) || accountDate.isAfter(endDate.plusDays(1).atStartOfDay())) continue accountLoop;

            Long amount = account.getAccountAmount();
            Long accountBalanceAtThatTime = account.getAccountBalance();
            LocalDateTime date = account.getAccountDate();
            String type = account.getAccountType();
            String nickname = account.getAccountNickname();
            BankingAccountDetail accountDetail = BankingAccountDetail.create(amount, accountBalanceAtThatTime, date, type, nickname);

            bankingAccountDetailList.add(accountDetail);
        }

        // 정렬1: 최신 순 / 오래된 순
        String sortCriteria = request.getSortCriteria();
        if(sortCriteria.equals("newest")) {
            // 날짜 내림차순으로 정렬 (현재부터)
            bankingAccountDetailList.sort(Comparator.comparing(BankingAccountDetail::getAccountDate).reversed());
        } else if(sortCriteria.equals("oldest")) {
            // 날짜 오름차순으로 정렬 (과거부터)
            bankingAccountDetailList.sort(Comparator.comparing(BankingAccountDetail::getAccountDate));
        }

        BankingAccountResponse response = BankingAccountResponse.create(accountBalance, openDate, bankingAccountDetailList);
        return ResponseEntity.ok(response);
    }

    /**
     * 입금 서비스
     */
    @Override
    @Transactional
    public ResponseEntity<BankingAccountDepositResponse> deposit(BankingAccountDepositRequest request) {
        Member member = commonUtil.getMember();

        long amount = request.getAmount();

        // 예외1: 입금 요청 금액보다 보유 포인트가 적은 경우 (400)
        if(amount > member.getMemberCurPoint()) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Current Point");
        }

        long afterAccountBalance = getAccountBalance(member.getMemberPk()) + amount;

        Account deposit = Account.builder()
                .amount(amount)
                .type("입금")
                .nickname(member.getMemberNickname())
                .accountBalance(afterAccountBalance)
                .member(member)
                .build();

        accountRepository.save(deposit);
        member.updateCurPoint((-1)*amount); // 입금: curPoint -> accountBalance
        memberRepository.save(member);

        Long curPoint = member.getMemberCurPoint();
        LocalDateTime requestTime = deposit.getAccountDate();

        BankingAccountDepositResponse response = BankingAccountDepositResponse.create(curPoint, afterAccountBalance, requestTime);

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

        // 예외1: 출금 요청 금액보다 보유 계좌 잔고가 적은 경우 (400)
        if(amount > accountBalance) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Account Balance");
        }

        // 예외2: 입력 비밀번호가 유저의 비밀번호와 다른 경우 (400)
        if(!String.valueOf(accountPassword).equals(member.getMemberAccountPassword())) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Password Not Match");
        }

        long withdrawAmount = (-1)*(amount+1000); // 출금 수수료 1000원 부가
        Long afterAccountBalance = accountBalance + withdrawAmount;

        Account withdraw = Account.builder()
                .amount((-1)*amount)
                .type("출금")
                .nickname(member.getMemberNickname())
                .accountBalance(afterAccountBalance)
                .member(member)
                .build();

        accountRepository.save(withdraw);
        member.updateCurPoint(amount);
        memberRepository.save(member);

        Long curPoint = member.getMemberCurPoint();
        LocalDateTime requestTime = withdraw.getAccountDate();

        BankingAccountWithdrawResponse response = BankingAccountWithdrawResponse.create(curPoint, afterAccountBalance, requestTime);

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

        HashSet<String> remitMemberNicknames = new HashSet<>(); // 서로 다른 사용자 6명을 구분하기 위한 Set 자료구조

        // 예외1: 최근 송금한 사용자가 없을 때? (400)
        if(remits.isEmpty()) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Member Not Found");
        }

        for(Account remit: remits) {

            String otherMemberNickname = remit.getAccountNickname();
            Optional<Member> optionalOtherMember = memberRepository.findByMemberNickname(otherMemberNickname);

            log.info("member: "+otherMemberNickname);

            if(optionalOtherMember.isEmpty()) continue;

            if(!remitMemberNicknames.contains(otherMemberNickname)) {
                remitMemberNicknames.add(otherMemberNickname);

                Member otherMember = optionalOtherMember.get();
                String otherMemberImageUrl = otherMember.getMemberImageUrl();
                Long otherMemberPk = otherMember.getMemberPk();
                LocalDateTime requestTime = remit.getAccountDate();

                BankingAccountRemitMember remitMember = BankingAccountRemitMember.create(otherMemberPk, otherMemberNickname, otherMemberImageUrl, requestTime);
                response.addMember(remitMember);
            }

            if(remitMemberNicknames.size()==6) break;
        }

        return ResponseEntity.ok(response);
    }

    /**
     * 닉네임으로 사용자 조회 서비스
     */
    @Override
    public ResponseEntity<BankingMemberSearchResponse> searchMember(BankingMemberSearchRequest request) {
        String nickname = request.getNickname();
        Optional<Member> optionalSearchMembers = memberRepository.findByMemberNickname(nickname);

        // 예외1: 해당 닉네임의 사용자가 없을 경우 (400)
        if(optionalSearchMembers.isEmpty()) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Searched Member Not Found");
        }

        Member searchMember = optionalSearchMembers.get();
        BankingMemberSearchResponse response = BankingMemberSearchResponse.create(
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
        Optional<Member> optionalReceiveMember = memberRepository.findByMemberNickname(request.getOtherNickname());

        // 예외1: 송금할 사용자가 없을 때 (400)
        if(optionalReceiveMember.isEmpty()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Received Member Not Found");
        }

        Member receiveMember = optionalReceiveMember.get();

        long amount = request.getAmount();
        long accountPassword = request.getAccountPassword();
        long sendAccountBalance = getAccountBalance(sendMember.getMemberPk());
        long receiveAccountBalance = getAccountBalance(receiveMember.getMemberPk());

        // 예외2: 송금 요청 금액보다 보유 계좌 잔고가 적은 경우 (400)
        if(amount > sendAccountBalance) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Insufficient Account Balance");
        }

        // 예외3: 입력 비밀번호가 유저의 비밀번호와 다른 경우 (400)
        if(!String.valueOf(accountPassword).equals(sendMember.getMemberAccountPassword())) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Password Not Match");
        }

        long afterSendAccountBalance = sendAccountBalance - amount;
        long afterReceiveAccountBalance = receiveAccountBalance + amount;

        Account sendRemit = Account.builder()
                .amount((-1)*amount)
                .type("송금")
                .nickname(receiveMember.getMemberNickname()) // 적요(받은 사람 입력)
                .accountBalance(afterSendAccountBalance)
                .member(sendMember)
                .build();

        Account receiveRemit = Account.builder()
                .amount(amount)
                .type("송금")
                .nickname(sendMember.getMemberNickname()) // 적요(보낸 사람 입력)
                .accountBalance(afterReceiveAccountBalance)
                .member(receiveMember)
                .build();

        accountRepository.save(sendRemit);
        accountRepository.save(receiveRemit);

        LocalDateTime requestTime = sendRemit.getAccountDate();

        BankingAccountRemitResponse response = BankingAccountRemitResponse.create(afterSendAccountBalance, requestTime);

        return ResponseEntity.ok(response);
    }

    /**
     * 계좌 비밀번호 변경 서비스
     */
    @Override
    @Transactional
    public ResponseEntity<BankingPasswordChangeResponse> changePassword(BankingPasswordChangeRequest request) {

        Member member = commonUtil.getMember();

        String changePassword = request.getChangePassword();
        String checkPassword = request.getCheckPassword();
        String originPassword = request.getOriginPassword();

        String accountPassword = member.getMemberAccountPassword();

        // 예외1: 확인 비밀번호가 유저의 비밀번호와 다른 경우 (400)
        if(!String.valueOf(originPassword).equals(accountPassword)) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Password Not Match");
        }

//        String pattern = "\\d{4}"; // 4자리 숫자 형태의 정규 표현식
//        Pattern regex = Pattern.compile(pattern);
//        Matcher matcher1 = regex.matcher(changePassword);
//        Matcher matcher2 = regex.matcher(checkPassword);
//
//        // 예외2: 변경할 비밀번호 형식이 안맞을 때 (400)
//        if(!matcher1.matches()||!matcher2.matches()) {
//            throw new GlobalException(HttpStatus.BAD_REQUEST, "Not Match Input Format");
//        }

        // 예외3: 변경 비밀번호와 변경 확인 비밀번호가 다를 때 (400)
        if(!changePassword.equals(checkPassword)) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Check Password Not Match");
        }

        // 예외4: 변경할 비밀번호가 기존 비밀번호랑 같을 때 (400)
        if(changePassword.equals(accountPassword)) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Same Change Password");
        }

        member.changeAccountPassword(changePassword);
        BankingPasswordChangeResponse response = BankingPasswordChangeResponse.create(true);

        return ResponseEntity.ok(response);
    }

    /**
     * 사용자의 계좌 잔액 조회 서비스
     */
    public ResponseEntity<BankingAccountBalanceResponse> showAccountBalance() {
        Member member = commonUtil.getMember();

        long accountBalance = getAccountBalance(member.getMemberPk());
        BankingAccountBalanceResponse response = BankingAccountBalanceResponse.create(accountBalance);

        return ResponseEntity.ok(response);
    }


    /** 사용자의 계좌 잔액 조회 함수 **/
    @Override
    public long getAccountBalance(long memberPk) {

        Optional<Member> optionalMember = memberRepository.findById(memberPk);

        // 예외: 해당 사용자가 없을 때
        if(optionalMember.isEmpty()) {
            throw new GlobalException(HttpStatus.BAD_REQUEST, "Member Not Found");
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
