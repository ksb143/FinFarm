package com.moneygang.finfarm.domain.farm.service;

import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import com.moneygang.finfarm.domain.farm.dto.request.PlantRequest;
import com.moneygang.finfarm.domain.farm.dto.request.HarvestRequest;
import com.moneygang.finfarm.domain.farm.dto.response.*;
import org.springframework.http.ResponseEntity;

public interface FarmService {
    ResponseEntity<MyFarmResponse> myFarmView();
    ResponseEntity<DeleteItemResponse> itemDump(DeleteItemRequest request);
    ResponseEntity<FarmLevelPurchaseResponse> upgradeFarmLevel();
    ResponseEntity<PlantResponse> plantSeed(PlantRequest request);
    ResponseEntity<HarvestResponse> agricultureHarvest(HarvestRequest request);
}
