package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.market.dto.request.AgricultureSellRequest;
import com.moneygang.finfarm.domain.market.dto.request.SeedPurchaseRequest;
import com.moneygang.finfarm.domain.market.dto.response.MarketViewAllResponse;
import org.springframework.http.ResponseEntity;

public interface MarketService {
    ResponseEntity<MarketViewAllResponse> storeView();
    ResponseEntity<?> seedDetailView(String seedName);
    ResponseEntity<?> agricultureDetailView(String seedName);
    ResponseEntity<?> seedPurchase(SeedPurchaseRequest request);
    ResponseEntity<?> agricultureSell(AgricultureSellRequest request);


}
