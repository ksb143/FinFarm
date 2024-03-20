package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.global.exception.GlobalException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MarketServiceImpl implements MarketService {
    @Override
    public ResponseEntity<String> test(String s) {
        if(s.equals("a")){throw new GlobalException(HttpStatus.BAD_REQUEST, "test");}
        else
            return ResponseEntity.ok("ok");

    }
}
