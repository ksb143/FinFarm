package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.market.dto.MarketViewAllResponse;
import org.springframework.http.ResponseEntity;

public interface MarketService {
    ResponseEntity<MarketViewAllResponse> storeView();
    ResponseEntity<?> seedDetailView(String seedName);
    ResponseEntity<?> agricultureDetailView(String seedName);


}
