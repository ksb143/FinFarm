package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.market.dto.StoreViewAllResponse;
import org.springframework.http.ResponseEntity;

public interface MarketService {
    ResponseEntity<StoreViewAllResponse> storeView();
}
