package com.moneygang.finfarm.domain.store.service;

import com.moneygang.finfarm.global.exception.GlobalException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService {
    @Override
    public ResponseEntity<String> test(String s) {
        if(s.equals("a")){throw new GlobalException(HttpStatus.BAD_REQUEST, "test");}
        else
            return ResponseEntity.ok("ok");

    }
}
