package com.moneygang.finfarm.domain.banking;


import com.moneygang.finfarm.domain.banking.repository.AccountRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AccountRepositoryTest {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private MemberRepository memberRepository;

    private EntityManager em;

    @Test
    @DisplayName("사용자의 계좌 내역 추가")
    void saveAccountTest() {
        //given
//        Member testMember = memberRepository

        //when

        //then
    }

    @Test
    @DisplayName("사용자의 계좌 내역 조회")
    void findAccountTest() {
        //given

        //when

        //then
    }

}
