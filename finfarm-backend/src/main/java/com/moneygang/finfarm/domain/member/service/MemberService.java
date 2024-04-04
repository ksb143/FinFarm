package com.moneygang.finfarm.domain.member.service;

import com.moneygang.finfarm.domain.member.dto.request.MemberJoinRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberLoginRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberProfileRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberUpdateRequest;
import com.moneygang.finfarm.domain.member.dto.response.*;
import com.moneygang.finfarm.domain.member.entity.Member;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {
    //회원가입
    ResponseEntity<MemberJoinResponse> join(MemberJoinRequest request);
    //자동 로그인
    ResponseEntity<MemberAutoLoginResponse> autoLogin();
    //로그인
    ResponseEntity<MemberLoginResponse> login(MemberLoginRequest request);
    //토큰 재발급
    ResponseEntity<MemberReissueResponse> reissue(String userEmail, String refreshToken);
    //회원탈퇴
    ResponseEntity<MemberQuitResponse> quit();
    //마이페이지 조회
    ResponseEntity<MemberMypageResponse> getMypage();
    //마이페이지 수정
    ResponseEntity<MemberUpdateResponse> updateMypage(MemberUpdateRequest request);
    //프로필 이미지 저장
    ResponseEntity<MemberProfileResponse> saveProfileImage(MemberProfileRequest request);
    //회원 닉네임 중복 조회
    ResponseEntity<MemberDuplicateNicknameResponse> duplicateNickname(String nickname);
    //회원 이메일 중복 조회
    ResponseEntity<MemberDuplicateEmailResponse> duplicateEmail(String email);

    ResponseEntity<List<Member>> selcetAll();

    ResponseEntity<MemberQuizPossibleResponse> isQuizSolvePossible();

    ResponseEntity<MemberGetQuizAwardResponse> getQuizAward();

}
