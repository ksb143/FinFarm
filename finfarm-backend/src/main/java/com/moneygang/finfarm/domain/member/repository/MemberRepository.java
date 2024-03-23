package com.moneygang.finfarm.domain.member.repository;

import com.moneygang.finfarm.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberNickname(String nickname);
}
