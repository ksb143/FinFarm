package com.moneygang.finfarm.domain.farm.controller;

import com.moneygang.finfarm.domain.farm.service.FarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/farm")
public class FarmController {
    private final FarmService farmService;

    @GetMapping
    public ResponseEntity<?> myFarmView(){
        return farmService.myFarmView();
    }

}
