package com.moneygang.finfarm.domain.market.controller;

import com.moneygang.finfarm.domain.market.dto.StoreViewAllResponse;
import com.moneygang.finfarm.domain.market.service.MarketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/store")
public class MarketController {
    private final MarketService storeService;

    @GetMapping
    public ResponseEntity<StoreViewAllResponse> marketView(){
        return ResponseEntity.ok(
                StoreViewAllResponse.createStoreViewAllResponse(
                        null,
                        null
                )
        );
    }
}
