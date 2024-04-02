package com.moneygang.finfarm.domain.member.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.moneygang.finfarm.domain.member.dto.request.MemberJoinRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberLoginRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberProfileRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberUpdateRequest;
import com.moneygang.finfarm.domain.member.dto.response.*;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.base.AwsS3ObjectStorage;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.base.JwtTokenProvider;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final CommonUtil commonUtil;
    private final JwtTokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final AwsS3ObjectStorage awsS3ObjectStorage;


    @Override
    public ResponseEntity<List<Member>> selcetAll() {
        List<Member> findAll = memberRepository.findAll();

        return ResponseEntity.ok(findAll);
    }

    @Override
    @Transactional
    public ResponseEntity<MemberJoinResponse> join(MemberJoinRequest request) {
        log.info("member join");

        //유저 이메일 중복 확인
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(request.getMemberEmail());
        if(optionalMember.isPresent())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MemberJoinResponse.create("회원가입 실패"));

        //유저 등록
        Member member = Member.builder()
                .memberEmail(request.getMemberEmail())
                .memberNickname(request.getMemberNickname())
                .memberAccountPassword(request.getMemberAccountPassword())
                .memberImageUrl(request.getMemberImageUrl())
                .memberSolveQuiz(false)
                .memberLoanOverdue(false)
                .memberCurPoint(0L)
                .memberCreateDate(LocalDate.now())
                .farmLevel(1)
                .memberLoanOverdue(false)
                .build();

        memberRepository.save(member);

        return ResponseEntity.ok(MemberJoinResponse.create("회원가입 성공"));
    }

    @Override
    public ResponseEntity<MemberAutoLoginResponse> autoLogin() {
        log.info("member autoLogin");

        // authentication 에서 member 객체 조회
        Member member = commonUtil.getMember();

        return ResponseEntity.ok(MemberAutoLoginResponse.create(member.getMemberNickname(), member.isMemberSolveQuiz(), member.getMemberSolveQuizTime(), member.getMemberCurPoint(), member.getMemberImageUrl()));
    }

    @Override
    public ResponseEntity<MemberLoginResponse> login(MemberLoginRequest request) {
        log.info("member login");

        //카카오 토큰 받기
        String kakaoAccessToken = getKakaoAccessToken(request);
        log.info("accessToken: " + kakaoAccessToken);

        //카카오 유저 정보 가져오기
        Map<String, Object> userInfo = getUserKakaoInfo(kakaoAccessToken);
        String memberEmail = (String) userInfo.get("email");
        log.info("userEmail: " + memberEmail);

        //유저 이메일 조회
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberEmail);
        if(optionalMember.isPresent()) {
            //회원인 경우
            Member member = optionalMember.get();

            //access token 및 refresh token 생성
            String accessToken = tokenProvider.createAccessToken(memberEmail);
            String refreshToken = tokenProvider.createRefreshToken(memberEmail);

            // refresh token 을 쿠키에 저장
            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true) // HttpOnly 속성 설정으로 JavaScript에서 접근하지 못하도록 함
                    .secure(true) // HTTPS를 통해서만 쿠키가 전송되도록 함
                    .path("/") // 쿠키의 경로 설정
                    // .domain("yourdomain.com") // 쿠키의 도메인 설정 (필요한 경우)
                    .maxAge(7 * 24 * 60 * 60) // 쿠키의 만료 시간 설정 (7일)
                    .build();

            // 쿠키를 response header 에 담아서 저장
            return ResponseEntity.ok()
                    .header("Set-Cookie", refreshTokenCookie.toString())
                    .body(MemberLoginResponse.create(accessToken, member.getMemberEmail(), member.getMemberNickname(), member.isMemberSolveQuiz(), member.getMemberSolveQuizTime(),  member.getMemberCurPoint(), member.getMemberImageUrl(), member.getMemberCreateDate(),true));
        }
        //회원이 아닌 경우
        return ResponseEntity.ok(MemberLoginResponse.create(null, memberEmail, null, false, null, 0L, null, null, false));
    }

    public String getKakaoAccessToken(MemberLoginRequest request) {
        String access_Token;
        String refresh_Token;
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            // HttpClient 인스턴스 생성
            HttpClient httpClient = HttpClient.newHttpClient();

            // 요청할 URL 설정
            URI uri = URI.create(reqURL);

            // 요청 파라미터 설정
            Map<Object, Object> data = new HashMap<>();
            data.put("grant_type", "authorization_code");
            data.put("client_id", "434c09e04423ad80d97eb8f45f3bc229");
            if(request.getUrl().contains("j10d203")) {
                data.put("redirect_uri", "https://j10d203.p.ssafy.io/oauth/callback/kakao");
            } else {
                data.put("redirect_uri", "http://localhost:5173/oauth/callback/kakao");
            }
            data.put("code", request.getAuthCode());

            // 요청 본문 생성
            String requestBody = data.entrySet().stream()
                    .map(entry -> entry.getKey() + "=" + entry.getValue())
                    .reduce((a, b) -> a + "&" + b)
                    .orElse("");

            // HTTP 요청 구성
            HttpRequest newRequest = HttpRequest.newBuilder()
                    .uri(uri)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            // 요청 보내기
            HttpResponse<String> response = httpClient.send(newRequest, HttpResponse.BodyHandlers.ofString());

            // 응답 코드가 200이면 성공
            if (response.statusCode() == 200) {
                log.info("responseCode : " + response.statusCode());
                log.info("response body : " + response.body());

                // JSON 파싱
                JsonElement element = JsonParser.parseString(response.body());
                access_Token = element.getAsJsonObject().get("access_token").getAsString();
                refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

                log.info("access_token : " + access_Token);
                log.info("refresh_token : " + refresh_Token);
            } else {
                log.info("HTTP 요청 실패: " + response.statusCode());
                throw new GlobalException(HttpStatus.BAD_REQUEST, "잘못된 인가 코드입니다.");
            }
        } catch (IOException | InterruptedException e) {
            throw new GlobalException(HttpStatus.INTERNAL_SERVER_ERROR, "error");
        }

        return access_Token;
    }

    public Map<String, Object> getUserKakaoInfo(String access_Token) {

        // 요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(reqURL))
                    .header("Authorization", "Bearer " + access_Token)
                    .GET()
                    .build();

            // 토큰으로 카카오 유저 정보 조회
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            log.info("responseCode : " + response.statusCode());

            String result = response.body();
            log.info("response body : " + result);

            // JSON 파싱
            JsonElement element = JsonParser.parseString(result);

            // 유저 id 저장
            String id = element.getAsJsonObject().get("id").getAsString();
            userInfo.put("id", id);

            // 유저 email 저장
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            if(kakao_account.getAsJsonObject().get("email") != null){
                String email = kakao_account.getAsJsonObject().get("email").getAsString();
                userInfo.put("email", email);
            }

        } catch (IOException | InterruptedException e) {
            throw new GlobalException(HttpStatus.INTERNAL_SERVER_ERROR, "error");
        }
        return userInfo;
    }

    @Override
    public ResponseEntity<MemberReissueResponse> reissue(String userEmail, String refreshToken) {
        log.info("member reissue");

        //refreshToken 유효성 검사
        String savedToken = redisTemplate.opsForValue().get("token_" + userEmail);
        if (refreshToken.isEmpty() || !tokenProvider.validateToken(refreshToken) || !refreshToken.equals(savedToken)) {
            log.info("토큰 재발급 실패");
            throw new GlobalException(HttpStatus.BAD_REQUEST, "refresh token 이 일치하지 않거나 존재하지 않습니다.");
        }

        //새로운 토큰 발급
        String newAccessToken = tokenProvider.createAccessToken(userEmail);
        String newRefreshToken = tokenProvider.createRefreshToken(userEmail);

        // refresh token 을 쿠키에 저장
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", newRefreshToken)
                .httpOnly(true) // HttpOnly 속성 설정으로 JavaScript에서 접근하지 못하도록 함
                .secure(true) // HTTPS를 통해서만 쿠키가 전송되도록 함
                .path("/") // 쿠키의 경로 설정
                // .domain("yourdomain.com") // 쿠키의 도메인 설정 (필요한 경우)
                .maxAge(7 * 24 * 60 * 60) // 쿠키의 만료 시간 설정 (7일)
                .build();

        // 쿠키를 response header 에 담아서 저장
        log.info("토큰 재발급 성공");
        return ResponseEntity.ok()
                .header("Set-Cookie", refreshTokenCookie.toString())
                .body(MemberReissueResponse.create(newAccessToken));
    }

    @Override
    @Transactional
    public ResponseEntity<MemberQuitResponse> quit() {
        log.info("member quit");

        // authentication 에서 member 객체 조회
        Member member = commonUtil.getMember();

        // member 삭제
        memberRepository.deleteById(member.getMemberPk());

        return ResponseEntity.ok(MemberQuitResponse.create("회원 탈퇴 성공"));
    }

    @Override
    public ResponseEntity<MemberMypageResponse> getMypage() {
        log.info("member getMypage");

        // authentication 에서 member 객체 조회
        Member member = commonUtil.getMember();

        return ResponseEntity.ok(MemberMypageResponse.create(member.getMemberNickname(), member.getMemberImageUrl()));
    }

    @Override
    @Transactional
    public ResponseEntity<MemberUpdateResponse> updateMypage(MemberUpdateRequest request) {
        log.info("member updateMypage");

        // authentication 에서 member 객체 조회
        Member member = commonUtil.getMember();

        String request_nickname = request.getMemberNickname();
        String request_url = request.getMemberImageUrl();

        //닉네임 변경
        if(!request_nickname.isEmpty() && !member.getMemberNickname().equals(request_nickname)) {
            member.setMemberNickname(request_nickname);
        }
        //이미지 변경
        if(!request_url.isEmpty() && !member.getMemberImageUrl().equals(request_url)) {

            // 기존 이미지 URL이 비어 있지 않다면 S3에서 해당 이미지 삭제
            if (!member.getMemberImageUrl().isEmpty()) {
                //S3 이미지 삭제
                awsS3ObjectStorage.deleteFile(member.getMemberImageUrl());

            }
            //새로운 이미지 url 을 member 객체에 저장
            member.setMemberImageUrl(request_url);
        }

        return ResponseEntity.ok(MemberUpdateResponse.create("마이페이지 수정 성공"));
    }

    @Override
    public ResponseEntity<MemberProfileResponse> saveProfileImage(MemberProfileRequest request) {
        log.info("member saveProfileImage");

        //저장할 사진 파일
        MultipartFile file = request.getFile();

        try {
            // S3 사진 업로드
            String savedUrl = awsS3ObjectStorage.uploadFile(file);
            return ResponseEntity.ok(MemberProfileResponse.create(savedUrl));

        } catch (IOException e) {
            // S3 업로드 실패
            log.error(e.getMessage());
            throw new GlobalException(HttpStatus.BAD_REQUEST, "프로필 사진 저장 실패");
        }
    }

    @Override
    public ResponseEntity<MemberDuplicateNicknameResponse> duplicateNickname(String nickname) {
        log.info("member duplicateNickname");

        //닉네임 조회
        Optional<Member> optionalMember = memberRepository.findByMemberNickname(nickname);
        if(optionalMember.isPresent()) {
            //닉네임 사용 불가능
            return ResponseEntity.ok(MemberDuplicateNicknameResponse.create(true));
        }
        //닉네임 사용 가능
        return ResponseEntity.ok(MemberDuplicateNicknameResponse.create(false));
    }

    @Override
    public ResponseEntity<MemberDuplicateEmailResponse> duplicateEmail(String email) {
        log.info("member duplicateEmail");

        //이메일 조회
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(email);
        if(optionalMember.isPresent()) {
            //이메일 사용 불가능
            return ResponseEntity.ok(MemberDuplicateEmailResponse.create(true));
        }
        //이메일 사용 가능
        return ResponseEntity.ok(MemberDuplicateEmailResponse.create(false));
    }

    @Override
    public ResponseEntity<MemberQuizPossibleResponse> isQuizSolvePossible() {
        Member member = commonUtil.getMember();
        LocalDate now = LocalDate.now();
        if (member.getMemberSolveQuizTime().isBefore(now)){
            return ResponseEntity.ok(MemberQuizPossibleResponse.create(true));
        }
        return ResponseEntity.ok(MemberQuizPossibleResponse.create(false));
    }

    @Override
    @Transactional
    public ResponseEntity<MemberGetQuizAwardResponse> getQuizAward() {
        Member member = commonUtil.getMember();
        member.setMemberCurPoint(member.getMemberCurPoint() + 5000L);
        member.setMemberSolveQuizTime(LocalDate.now());


        return ResponseEntity.ok(MemberGetQuizAwardResponse.create(member.getMemberCurPoint()));
    }
}