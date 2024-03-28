package com.moneygang.finfarm.domain.farm.service;

import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import com.moneygang.finfarm.domain.farm.dto.request.PlantRequest;
import com.moneygang.finfarm.domain.farm.dto.request.HarvestRequest;
import org.springframework.http.ResponseEntity;

public interface FarmService {
    ResponseEntity<?> myFarmView();
    ResponseEntity<?> itemDump(DeleteItemRequest request);
    ResponseEntity<?> upgradeFarmLevel();
    ResponseEntity<?> plantSeed(PlantRequest request);
    ResponseEntity<?> agricultureHarvest(HarvestRequest request);
}
