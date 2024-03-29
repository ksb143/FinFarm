package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import com.moneygang.finfarm.domain.farm.repository.WarehouseRepository;
import com.moneygang.finfarm.domain.market.dto.request.AgricultureSellRequest;
import com.moneygang.finfarm.domain.market.dto.request.SeedPurchaseRequest;
import com.moneygang.finfarm.domain.market.dto.response.*;
import com.moneygang.finfarm.domain.market.dto.detail.*;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import com.moneygang.finfarm.domain.market.entity.Seed;
import com.moneygang.finfarm.domain.market.repository.AgriculturePriceRepository;
import com.moneygang.finfarm.domain.market.repository.AgricultureRepository;

import com.moneygang.finfarm.domain.market.repository.SeedRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.dto.MemberWarehouseDTO;
import com.moneygang.finfarm.global.exception.GlobalException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {
    private final AgricultureRepository agricultureRepository;
    private final AgriculturePriceRepository agriculturePriceRepository;
    private final WarehouseRepository warehouseRepository;
    private final SeedRepository seedRepository;
    private final MemberRepository memberRepository;
    private final CommonUtil commonUtil;

    @Override
    public ResponseEntity<MarketViewAllResponse> storeView() {
        List<AgricultureDTO> agricultureDTOList = new ArrayList<>();
        for(long i=1;i<=10;i++) {
            Optional<Agriculture> agricultureOptional = agricultureRepository.findById(i);
            List<AgriculturePrice> agriculturePriceList =
                    agriculturePriceRepository.findAllByAgriculture_AgriculturePkAndAgriculturePriceDateBetweenOrderByAgriculturePriceDateAsc(
                            agricultureOptional.get().getAgriculturePk(),
                            LocalDate.now().minusDays(364),
                            LocalDate.now()
                    );
            int minPrice = Integer.MAX_VALUE, maxPrice = Integer.MIN_VALUE;
            for (int idx = agriculturePriceList.size() - 1; idx >= agriculturePriceList.size() - 7; idx--) {
                minPrice = Math.min(minPrice, agriculturePriceList.get(idx).getAgriculturePriceValue());
                maxPrice = Math.max(maxPrice, agriculturePriceList.get(idx).getAgriculturePriceValue());
            }
            List<AgriculturePriceHistoryDTO> agriculturePriceHistoryDTOList = new ArrayList<>();
            for (AgriculturePrice agriculturePrice : agriculturePriceList) {
                agriculturePriceHistoryDTOList.add(
                        AgriculturePriceHistoryDTO.create(
                                agriculturePrice.getAgriculturePriceDate(),
                                agriculturePrice.getAgriculturePriceValue()
                        )
                );
            }
            agricultureDTOList.add(
                AgricultureDTO.create(
                        agricultureOptional.get(),
                        agriculturePriceList,
                        minPrice, maxPrice,
                        agriculturePriceHistoryDTOList
                )
            );
        }
        MarketViewAllResponse marketViewAllResponse =
                MarketViewAllResponse.create(agricultureDTOList, commonUtil.getMemberItem().getMemberItems());

        return ResponseEntity.ok(marketViewAllResponse);
    }

    @Override
    public ResponseEntity<?> seedDetailView(String seedName) {
        Seed seed = seedRepository.findBySeedName(seedName)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "seed not found"));
        SeedInfoResponse response = SeedInfoResponse.create(seed);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> agricultureDetailView(String agricultureName) {
        Agriculture agriculture = agricultureRepository.findByAgricultureName(agricultureName)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "agriculture not found"));
        AgricultureInfoResponse response = AgricultureInfoResponse.create(agriculture);
        return ResponseEntity.ok(response);
    }

    @Transactional
    @Override
    public ResponseEntity<?> seedPurchase(SeedPurchaseRequest request) {
        Member member = commonUtil.getMember();

        Seed seed = seedRepository.findBySeedName(request.getSeedName())
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "seed not found"));

        double purchasePrice =  seed.getSeedPrice() * request.getSeedCount();
        if(purchasePrice > member.getMemberCurPoint()){
            throw new GlobalException(HttpStatus.PAYMENT_REQUIRED, "Payment Required");
        }

        int warehouseSize =  warehouseRepository.findAllByMember_MemberPk(member.getMemberPk()).size();
        if(warehouseSize >= 25)
            throw new GlobalException(HttpStatus.CONFLICT, "warehouse is full");

        member.setMemberCurPoint((long) (member.getMemberCurPoint() - purchasePrice));
        memberRepository.save(member);

        List<Warehouse> warehouseList =
                warehouseRepository.findAllByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountDesc(
                        member.getMemberPk(), seed.getAgriculture().getAgriculturePk(), 1
                );
        Warehouse warehouse = null;
        if(warehouseList.isEmpty()){
            warehouse = new Warehouse(1, request.getSeedCount(), member, seed.getAgriculture());
        }else{
            int seedsToStore = request.getSeedCount(); // 저장할 씨앗의 총 수량
            for (Warehouse warehouseLoop : warehouseList) {
                // 현재 창고 슬롯에 저장할 수 있는 수량 계산
                int availableSpace = 999 - warehouseLoop.getWarehouseAmount();
                if (availableSpace > 0) {
                    // 현재 슬롯에 저장할 수 있는 공간이 있는 경우
                    int storingAmount = Math.min(seedsToStore, availableSpace);
                    warehouseLoop.setWarehouseAmount(warehouseLoop.getWarehouseAmount() + storingAmount);
                    warehouseRepository.save(warehouseLoop);
                    seedsToStore -= storingAmount; // 저장 후 남은 씨앗 수량 업데이트
                    if (seedsToStore == 0) break; // 모든 씨앗을 저장했으면 반복 종료
                }
            }
            while (seedsToStore > 0) {
                // 남은 씨앗이 있으면 새로운 슬롯에 저장
                int storingAmount = Math.min(seedsToStore, 999);
                Warehouse newWarehouse = new Warehouse(1, storingAmount, member, seed.getAgriculture());
                warehouseRepository.save(newWarehouse);
                seedsToStore -= storingAmount; // 저장 후 남은 씨앗 수량 업데이트
            }
        }
        MemberWarehouseDTO userInfo = commonUtil.getMemberItem();
        return ResponseEntity.ok(SeedPurchaseResponse.create(
                userInfo.getMember().getMemberCurPoint(),
                userInfo.getMemberItems()
        ));
    }

    @Transactional
    @Override
    public ResponseEntity<?> agricultureSell(AgricultureSellRequest request) {
        Member member = commonUtil.getMember();

        Agriculture agriculture = agricultureRepository.findByAgricultureName(request.getAgricultureName())
                        .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "agriculture not found"));

        List<Warehouse> warehouseList =
                warehouseRepository.findAllByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountAsc(
                        member.getMemberPk(), agriculture.getAgriculturePk(), 2
                );
        if(warehouseList.isEmpty())
            throw new GlobalException(HttpStatus.NOT_FOUND, "No items owned");

        int sumItemCount = warehouseRepository.sumOfWarehouseMyAgricultureCount(
                member.getMemberPk(), agriculture.getAgriculturePk(), 2
        );
        if(sumItemCount < request.getAgricultureAmount()){
            throw new GlobalException(HttpStatus.UNPROCESSABLE_ENTITY, "Insufficient stock for sale");
        }

        int itemsToDiscard = request.getAgricultureAmount();
        for (Warehouse warehouse : warehouseList) {
            int warehouseAmount = warehouse.getWarehouseAmount();
            if (itemsToDiscard >= warehouseAmount) {
                warehouseRepository.delete(warehouse);
                itemsToDiscard -= warehouseAmount;
                if (itemsToDiscard == 0) break;
            } else {
                warehouse.setWarehouseAmount(warehouseAmount - itemsToDiscard);
                warehouseRepository.save(warehouse);
                break;
            }
        }
        List<AgriculturePrice> agriculturePriceList =
        agriculturePriceRepository.findAllByAgriculture_AgriculturePkAndAgriculturePriceDateBetweenOrderByAgriculturePriceDateDesc(
                agriculture.getAgriculturePk(), LocalDate.now().minusDays(7), LocalDate.now()
        );

        long salePrice = (long) agriculturePriceList.get(0).getAgriculturePriceValue() * request.getAgricultureAmount();
        member.updateCurPoint(salePrice);
        memberRepository.save(member);

        MemberWarehouseDTO userInfo = commonUtil.getMemberItem();
        return ResponseEntity.ok(AgricultureSellResponse.create(
                userInfo.getMember().getMemberCurPoint(),
                userInfo.getMemberItems()
        ));
    }
}