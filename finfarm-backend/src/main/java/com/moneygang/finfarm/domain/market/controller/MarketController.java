package com.moneygang.finfarm.domain.market.controller;

import com.moneygang.finfarm.domain.market.dto.AgricultureInfoResponse;
import com.moneygang.finfarm.domain.market.dto.MarketViewAllResponse;
import com.moneygang.finfarm.domain.market.dto.SeedInfoResponse;
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
@RequestMapping("/store")
public class MarketController {
    private final MarketService storeService;

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
        return storeService.storeView();
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
    public ResponseEntity<?> seedDetailView(@RequestParam("seedName") String seedName) {
        return storeService.seedDetailView(seedName);
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
    public ResponseEntity<?> agricultureDetailView(@RequestParam("agricultureName") String agricultureName) {
        return storeService.agricultureDetailView(agricultureName);
    }
}
