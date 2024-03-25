package com.moneygang.finfarm.global.base;

import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CommonUtil {

    private final MemberRepository memberRepository;

    @Autowired
    public CommonUtil(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }
    public Member getMember(){
        // 현재 접속한 유저 정보를 가져오는 메서드
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Member currentMember = memberRepository.findByMemberEmail(userEmail)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "user not found"));

        return currentMember;
    }
}
