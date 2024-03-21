package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.market.dto.StoreViewAllResponse;
import com.moneygang.finfarm.domain.market.repository.MarketRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {
    private final MarketRepository marketRepository;
    @Override
    public ResponseEntity<StoreViewAllResponse> storeView() {
        return null;
    }
}
