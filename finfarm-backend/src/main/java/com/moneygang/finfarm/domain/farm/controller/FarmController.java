package com.moneygang.finfarm.domain.farm.controller;

import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import com.moneygang.finfarm.domain.farm.dto.response.DeleteItemResponse;
import com.moneygang.finfarm.domain.farm.dto.response.FarmLevelPurchaseResponse;
import com.moneygang.finfarm.domain.farm.dto.response.MyFarmResponse;
import com.moneygang.finfarm.domain.farm.service.FarmService;
import com.moneygang.finfarm.domain.market.dto.response.AgricultureInfoResponse;
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
@RequestMapping("/farm")
public class FarmController {
    private final FarmService farmService;

    @Operation(summary = "내 농장 정보 조회", description = "사용자 농장 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = MyFarmResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "member not found", code : 404)
                    """, content = @Content)
    })
    @GetMapping
    public ResponseEntity<?> myFarmView(){
        return farmService.myFarmView();
    }

    @Operation(summary = "아이템 버리기", description = "사용자가 원하는 아이템 개수만큼 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = DeleteItemResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "member not found", code : 404)
                    
                    (message : "item not found", code : 404)
                    """, content = @Content),
            @ApiResponse(responseCode = "402", description = """
                    (message : "Exceeds owned quantity", code : 402)
                    """, content = @Content)
    })
    @PatchMapping("/dump")
    public ResponseEntity<?> itemDump(@RequestBody DeleteItemRequest request){
        return farmService.itemDump(request);
    }

    @Operation(summary = "농장 지력 강화", description = "사용자 농장을 확률에 따라서 강화 성공 여부를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(message : \"Success\", code : 200)",
                    content = @Content(schema = @Schema(implementation = FarmLevelPurchaseResponse.class))),
            @ApiResponse(responseCode = "404", description = """
                    (message : "member not found", code : 404)
                    """, content = @Content),
            @ApiResponse(responseCode = "402", description = """
                    (message : "Payment Required", code : 402)
                    """, content = @Content),
            @ApiResponse(responseCode = "422", description = """
                    (message : "farm Level Max", code : 422)
                    """, content = @Content)
    })
    @GetMapping("/farm-level")
    public ResponseEntity<?> upgradeFarmLevel(){
        return farmService.upgradeFarmLevel();
    }
}
