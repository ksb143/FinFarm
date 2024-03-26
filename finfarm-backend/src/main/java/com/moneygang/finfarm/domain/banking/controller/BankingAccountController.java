package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.dto.request.*;
import com.moneygang.finfarm.domain.banking.dto.response.*;
import com.moneygang.finfarm.domain.banking.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/banking/account")
@RequiredArgsConstructor
public class BankingAccountController {

    private final AccountService accountService;


    @Operation(summary = "계좌 내역 조회", description = "필터링, 정렬 조건에 따라 계좌 내역을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingAccountResponse.class))),
    })
    @GetMapping
    public ResponseEntity<BankingAccountResponse> getAccountHistory(@RequestBody BankingAccountRequest request) {
        return accountService.getAccountHistory(request);
    }


    @Operation(summary = "계좌 입금", description = "계좌에 원하는 금액을 입금합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingAccountDepositRequest.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "Insufficient Current Point", code : 400)""", content = @Content)
    })
    @PostMapping("/deposit")
    public ResponseEntity<BankingAccountDepositResponse> deposit(@RequestBody BankingAccountDepositRequest request) {
        return accountService.deposit(request);
    }


    @Operation(summary = "계좌 출금", description = "계좌에 원하는 금액을 출금합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingAccountWithdrawResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "Insufficient Current Point", code : 400)
                    
                    (message : "Password Not Match", code : 400)""", content = @Content)
    })
    @PostMapping("/withdraw")
    public ResponseEntity<BankingAccountWithdrawResponse> withdraw(@RequestBody BankingAccountWithdrawRequest request) {
        return accountService.withdraw(request);
    }


    @Operation(summary = "송금 상대방 조회", description = "최근 송금한 상대방 6명을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingAccountRemitRecentResponse.class))),
    })
    @GetMapping("/remit/recent")
    public ResponseEntity<BankingAccountRemitRecentResponse> recentRemitMembers() {
        return accountService.recentRemitMembers();
    }


    @Operation(summary = "송금 사용자 검색", description = "송금하길 원하는 사용자를 닉네임으로 검색합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingMemberSearchResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "Searched Member Not Found", code : 400)""", content = @Content)
    })
    @GetMapping("/remit")
    public ResponseEntity<BankingMemberSearchResponse> searchMemberForRemit(@RequestBody BankingMemberSearchRequest request) {
        return accountService.searchMember(request);
    }


    @Operation(summary = "계좌 송금", description = "다른 사용자에게 원하는 금액을 송금합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingAccountRemitResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "Received Member Not Found", code : 400)
                    
                    (message : "Insufficient Account Balance", code : 400)
                    
                    (message : "Password Not Match", code : 400)""", content = @Content)
    })
    @PostMapping("/remit")
    public ResponseEntity<BankingAccountRemitResponse> remit(@RequestBody BankingAccountRemitRequest request) {
        return accountService.remit(request);
    }


    @Operation(summary = "계좌 비밀번호 변경", description = "계좌 비밀번호를 변경합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingPasswordChangeResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "Password Not Match", code : 400)
                    
                    (message : "Not Match Input Format", code : 400)
                    
                    (message : "Check Password Not Match", code : 400)
                    
                    (message : "Same Change Password", code : 400)""", content = @Content)
    })
    @PutMapping("/password")
    public ResponseEntity<BankingPasswordChangeResponse> changePassword(@RequestBody BankingPasswordChangeRequest request) {
        return accountService.changePassword(request);
    }
}
