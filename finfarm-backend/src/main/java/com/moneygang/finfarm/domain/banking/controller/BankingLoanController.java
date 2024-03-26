package com.moneygang.finfarm.domain.banking.controller;

import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanAuditRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanRepayRequest;
import com.moneygang.finfarm.domain.banking.dto.request.BankingLoanTakeRequest;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanAuditResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanRepayResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanResponse;
import com.moneygang.finfarm.domain.banking.dto.response.BankingLoanTakeResponse;
import com.moneygang.finfarm.domain.banking.service.LoanHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/banking/loan")
@RequiredArgsConstructor
public class BankingLoanController {

    private final LoanHistoryService loanHistoryService;

    @Operation(summary = "대출 내역 조회", description = "아직 상환하지 않은 대출 현황과 모든 대출 내역을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingLoanResponse.class))),
    })
    @GetMapping
    public ResponseEntity<BankingLoanResponse> getLoanHistory() {
        return loanHistoryService.getLoanHistory();
    }


    @Operation(summary = "대출 받기", description = "대출 심사 후 원하는 금액을 대출받습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingLoanTakeResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "Password Not Match", code : 400)

                    (message : "Loan Not Found", code : 400)""", content = @Content)
    })
    @PostMapping("/take")
    public ResponseEntity<BankingLoanTakeResponse> loan(@RequestBody BankingLoanTakeRequest request) {
        return loanHistoryService.loan(request);
    }


    @Operation(summary = "대출 심사", description = "(1) 해당 대출 상품을 이용하고 있는지, (2) 대출 연체 내역이 있는지 확인하며 대출 심사 진행")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingLoanAuditResponse.class))),
    })
    @GetMapping("/audit")
    public ResponseEntity<BankingLoanAuditResponse> loanAudit(@RequestBody BankingLoanAuditRequest request) {
        return loanHistoryService.loanAudit(request);
    }


    @Operation(summary = "대출 상환", description = "대출받은 금액을 이자를 붙여 상환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = BankingLoanRepayResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    (message : "User Not Found", code : 400)

                    (message : "User Fruit Not Found", code : 400)""", content = @Content)
    })
    @PostMapping("/repay")
    public ResponseEntity<BankingLoanRepayResponse> loanRepay(@RequestBody BankingLoanRepayRequest request) {
        return loanHistoryService.loanRepay(request);
    }
}
