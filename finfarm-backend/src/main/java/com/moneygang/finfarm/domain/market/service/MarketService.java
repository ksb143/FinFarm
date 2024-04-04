package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.market.dto.request.AgricultureSellRequest;
import com.moneygang.finfarm.domain.market.dto.request.SeedPurchaseRequest;
import com.moneygang.finfarm.domain.market.dto.response.*;
import org.springframework.http.ResponseEntity;

public interface MarketService {
    ResponseEntity<MarketViewAllResponse> storeView();
    ResponseEntity<SeedInfoResponse> seedDetailView(String seedName);
    ResponseEntity<AgricultureInfoResponse> agricultureDetailView(String seedName);
    ResponseEntity<SeedPurchaseResponse> seedPurchase(SeedPurchaseRequest request);
    ResponseEntity<AgricultureSellResponse> agricultureSell(AgricultureSellRequest request);
}
