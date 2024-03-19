package com.moneygang.finfarm.domain.store.controller;

import com.moneygang.finfarm.domain.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/store")
public class StoreController {
    private final StoreService storeService;

    @GetMapping
    public ResponseEntity<String> test(@RequestParam("string") String s){
        return storeService.test(s);
    }
}
