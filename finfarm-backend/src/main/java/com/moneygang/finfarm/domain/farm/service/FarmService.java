package com.moneygang.finfarm.domain.farm.service;

import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import org.springframework.http.ResponseEntity;

public interface FarmService {
    ResponseEntity<?> myFarmView();
    ResponseEntity<?> itemDump(DeleteItemRequest request);
}
