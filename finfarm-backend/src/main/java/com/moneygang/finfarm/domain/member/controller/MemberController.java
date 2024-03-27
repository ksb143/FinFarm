package com.moneygang.finfarm.domain.member.controller;

import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanTakeResponse;
import com.moneygang.finfarm.domain.member.dto.request.MemberJoinRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberLoginRequest;
import com.moneygang.finfarm.domain.member.dto.request.MemberReissueRequest;
import com.moneygang.finfarm.domain.member.dto.response.*;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<List<Member>> selectAll() {
        return memberService.selcetAll();
    }

    @Operation(summary = "회원 로그인", description = "카카오 로그인에서 받은 인가코드를 통해 회원정보를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = MemberLoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "(message : \"잘못된 인가 코드입니다.\", code : 404)", content = @Content)
    })
    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> kakaologin(@RequestBody MemberLoginRequest request) {
        String accessToken = memberService.getKakaoAccessToken(request.getAccessToken());
        log.info("accessToken: " + accessToken);
        HashMap<String, Object> userInfo = memberService.getUserKakaoInfo(accessToken);

        return memberService.login((String) userInfo.get("email"));
    }

    @Operation(summary = "회원 가입", description = "회원 정보(이메일, 닉네임, 계좌번호, 이미지 주소)를 받아 회원가입을 진행합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingLoanTakeResponse.class))),
            @ApiResponse(responseCode = "400", description = "(message : \"회원가입 실패\", code : 400)", content = @Content)
    })
    @PostMapping("/sign-up")
    public ResponseEntity<MemberJoinResponse> join(@RequestBody MemberJoinRequest request) {
        return memberService.join(request);
    }

    @Operation(summary = "자동 로그인", description = "access token 을 통해 로그인을 진행합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = MemberAutoLoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "(message : \"존재하지 않는 회원입니다.\", code : 400)", content = @Content),
            @ApiResponse(responseCode = "401", description = """
                    (message : \"토큰이 만료되었습니다.\", code : 401)
                    
                    (message : \"유효하지 않은 토큰입니다.\", code : 401)""", content = @Content),
    })
    @PostMapping("/auto-login")
    public ResponseEntity<MemberAutoLoginResponse> autoLogin() {
        return memberService.autoLogin();
    }

    @Operation(summary = "토큰 재발급", description = "이메일과 refresh token 을 통해 access token, refresh token 을 재발급 받습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = MemberReissueResponse.class))),
            @ApiResponse(responseCode = "400", description = "(message : \"refresh token 이 일치하지 않거나 존재하지 않습니다.\", code : 400)", content = @Content)
    })
    @PostMapping("/reissue")
    public ResponseEntity<MemberReissueResponse> reissue(@RequestBody MemberReissueRequest request, @CookieValue(name = "refreshToken", defaultValue = "token") String refreshToken) {
        return memberService.reissue(request.getMemberEmail(), refreshToken);
    }

    @Operation(summary = "회원 탈퇴", description = "access token 에 해당하는 유저 이메일로 회원 탈퇴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = MemberReissueResponse.class))),
            @ApiResponse(responseCode = "400", description = "(message : \"\", code : 400)", content = @Content),
            @ApiResponse(responseCode = "404", description = "(message : \"user not found\", code : 400)", content = @Content)
    })
    @DeleteMapping("/quit")
    public ResponseEntity<MemberQuitResponse> quit() {
        return memberService.quit();
    }
}
