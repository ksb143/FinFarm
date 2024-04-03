package com.moneygang.finfarm.domain.market.controller;

import com.moneygang.finfarm.domain.market.dto.request.AgricultureSellRequest;
import com.moneygang.finfarm.domain.market.dto.request.SeedPurchaseRequest;
import com.moneygang.finfarm.domain.market.dto.response.*;
import com.moneygang.finfarm.domain.market.service.MarketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/market")
public class MarketController {
    private final MarketService marketService;

    @Operation(summary = "장터 조회", description = "10가지 농산물 정보와 나의 아이템을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = MarketViewAllResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "user not found", code : 404)
                    """, content = @Content)
    })
    @GetMapping
    public ResponseEntity<MarketViewAllResponse> marketView() {
        return marketService.storeView();
    }

    @Operation(summary = "씨앗 세부 조회", description = "씨앗 정보를 세부 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = SeedInfoResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "seed not found", code : 404)
                    """, content = @Content)
    })
    @GetMapping("seed")
    public ResponseEntity<SeedInfoResponse> seedDetailView(@RequestParam("seedName") String seedName) {
        return marketService.seedDetailView(seedName);
    }

    @Operation(summary = "농산물 세부 조회", description = "농산물 정보를 세부 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = AgricultureInfoResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "agriculture not found", code : 404)
                    """, content = @Content)
    })
    @GetMapping("agriculture")
    public ResponseEntity<AgricultureInfoResponse> agricultureDetailView(@RequestParam("agricultureName") String agricultureName) {
        return marketService.agricultureDetailView(agricultureName);
    }

    @Operation(summary = "농산물 씨앗 구매", description = "씨앗을 구매합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = SeedPurchaseResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "member not found", code : 404)
                    
                    (message : "seed not found", code : 404)
                    """, content = @Content),
            @ApiResponse(responseCode = "402", description = """
                    (message : "Payment Required", code : 402)
                    """, content = @Content)
    })
    @PostMapping("seed")
    public ResponseEntity<SeedPurchaseResponse> seedPurchase(@RequestBody SeedPurchaseRequest request){
        return marketService.seedPurchase(request);
    }

    @Operation(summary = "농산물 판매", description = "사용자가 보유한 농산물을 판매합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = AgricultureSellResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "member not found", code : 404)
                    
                    (message : "agriculture not found", code : 404)
                    
                    (message : "No items owned", code : 404)
                    """, content = @Content),
            @ApiResponse(responseCode = "422", description = """
                    (message : "Insufficient stock for sale", code : 422)
                    """, content = @Content)
    })
    @PostMapping("sell")
    public ResponseEntity<AgricultureSellResponse> agricultureSell(@RequestBody AgricultureSellRequest request){
        return marketService.agricultureSell(request);
    }

    @GetMapping("test")
    public ResponseEntity<TestResponse> test(){
        return marketService.test();
    }
}
