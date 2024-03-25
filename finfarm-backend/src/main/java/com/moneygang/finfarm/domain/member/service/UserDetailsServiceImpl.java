package com.moneygang.finfarm.domain.member.service;

import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 사용자 정보 조회
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(username);
        log.info(optionalMember.get().toString());
        if (!optionalMember.isPresent()) {
            throw new GlobalException(HttpStatus.NOT_FOUND, "Member not found : " + username);
        }
        Member member = optionalMember.get();
        return new User(member.getMemberEmail(), member.getMemberAccountPassword(), new ArrayList<>());
    }
}
