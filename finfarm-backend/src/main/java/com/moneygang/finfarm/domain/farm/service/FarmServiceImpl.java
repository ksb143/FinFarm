package com.moneygang.finfarm.domain.farm.service;


import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import com.moneygang.finfarm.domain.farm.dto.request.PlantRequest;
import com.moneygang.finfarm.domain.farm.dto.response.DeleteItemResponse;
import com.moneygang.finfarm.domain.farm.dto.response.FarmLevelPurchaseResponse;
import com.moneygang.finfarm.domain.farm.dto.response.MyFarmResponse;
import com.moneygang.finfarm.domain.farm.dto.detail.FarmFieldInfo;
import com.moneygang.finfarm.domain.farm.dto.response.PlantResponse;
import com.moneygang.finfarm.domain.farm.entity.FarmField;
import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import com.moneygang.finfarm.domain.farm.repository.FarmFieldRepository;
import com.moneygang.finfarm.domain.farm.repository.WarehouseRepository;
import com.moneygang.finfarm.domain.market.dto.detail.AgricultureInfo;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.market.dto.detail.SeedInfo;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.Seed;
import com.moneygang.finfarm.domain.market.repository.AgricultureRepository;
import com.moneygang.finfarm.domain.market.repository.SeedRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.entity.Reinforce;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.domain.member.repository.ReinforceRepository;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.dto.MemberWarehouseDTO;
import com.moneygang.finfarm.global.exception.GlobalException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Log4j2
@Service
@RequiredArgsConstructor
public class FarmServiceImpl implements FarmService{
    private final ReinforceRepository reinforceRepository;
    private final FarmFieldRepository farmFieldRepository;
    private final WarehouseRepository warehouseRepository;
    private final MemberRepository memberRepository;
    private final AgricultureRepository agricultureRepository;
    private final SeedRepository seedRepository;
    private final CommonUtil commonUtil;

    @Override
    public ResponseEntity<?> myFarmView() {
        MemberWarehouseDTO memberWarehouse = commonUtil.getMemberItem();
        Member member = memberWarehouse.getMember();
        List<Reinforce> reinforceList =
                reinforceRepository.findAllByReinforceLevelBetweenOrderByReinforceLevelAsc(
                        member.getFarmLevel(), member.getFarmLevel()+1
                );
        int curFarmEffectInt;
        int nextFarmEffectInt;
        double nextReinforceProbability;
        int nextReinforceCost;
        if(member.getFarmLevel() == 10){
            curFarmEffectInt = 55;
            nextFarmEffectInt = 55;
            nextReinforceProbability = 0;
            nextReinforceCost = 999999999;
        }else{
            double[] farmEffect = new double[2];
            for(int i=0;i<2;i++){
                farmEffect[i] = (1 - reinforceList.get(i).getReinforceProductionEfficiency()) * 100;
            }
            curFarmEffectInt = (int) Math.round(farmEffect[0]);
            nextFarmEffectInt = (int) Math.round(farmEffect[1]);
            nextReinforceCost = Math.toIntExact(reinforceList.get(1).getReinforcePrice());
            nextReinforceProbability = reinforceList.get(1).getReinforceSuccessProbability() * 100;
        }

        List<FarmField> farmFieldList =
                farmFieldRepository.findAllByMember_MemberPk(member.getMemberPk());

        List<FarmFieldInfo> farmFieldInfoList = new ArrayList<>();
        for (FarmField farmField : farmFieldList){
            farmFieldInfoList.add(
                    FarmFieldInfo.create(farmField, farmField.getAgriculture())
            );
        }

        MyFarmResponse response = MyFarmResponse.create(
                member, farmFieldInfoList, memberWarehouse.getMemberItems(),
                nextReinforceCost, curFarmEffectInt, nextFarmEffectInt, nextReinforceProbability
        );
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> itemDump(DeleteItemRequest request) {
        Member member = commonUtil.getMember();
        boolean updateCheck = false;
        List<Warehouse> warehouseList = warehouseRepository.findAllByMember_MemberPk(member.getMemberPk());
        for(Warehouse warehouse : warehouseList){
            if(warehouse.getAgriculture().getAgricultureName().equals(request.getName()) ||
                    warehouse.getAgriculture().getSeed().getSeedName().equals(request.getName())){
                int curWarehouseAmount =  warehouse.getWarehouseAmount();
                if(curWarehouseAmount < request.getAmount()){
                    throw new GlobalException(HttpStatus.UNPROCESSABLE_ENTITY, "Exceeds owned quantity");
                }
                int updateAmount = curWarehouseAmount - request.getAmount();
                if(updateAmount <= 0){
                    warehouseRepository.delete(warehouse);
                }else{
                    warehouse.setWarehouseAmount(updateAmount);
                    warehouseRepository.save(warehouse);
                }
                updateCheck = true;
                break;
            }
        }
        if(!updateCheck){
            throw new GlobalException(HttpStatus.NOT_FOUND, "item not found");
        }

        List<FarmField> farmFieldList =
                farmFieldRepository.findAllByMember_MemberPk(member.getMemberPk());
        List<FarmFieldInfo> farmFieldInfoList = new ArrayList<>();
        for (FarmField farmField : farmFieldList){
            farmFieldInfoList.add(
                    FarmFieldInfo.create(farmField, farmField.getAgriculture())
            );
        }

        MemberWarehouseDTO memberWarehouseDTO = commonUtil.getMemberItem();
        DeleteItemResponse response = DeleteItemResponse.create(
                memberWarehouseDTO.getMember(), farmFieldInfoList, memberWarehouseDTO.getMemberItems()
        );
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> upgradeFarmLevel() {
        Member member = commonUtil.getMember();
        if(member.getFarmLevel() == 10)
            throw new GlobalException(HttpStatus.UNPROCESSABLE_ENTITY, "farm Level Max");

        List<Reinforce> reinforceList =
                reinforceRepository.findAllByReinforceLevelBetweenOrderByReinforceLevelAsc(
                        member.getFarmLevel(),member.getFarmLevel()+1
                );
        long curPoint = member.getMemberCurPoint();
        long reinforcePrice = reinforceList.get(1).getReinforcePrice();
        if(reinforcePrice > curPoint)
            throw new GlobalException(HttpStatus.PAYMENT_REQUIRED, "Payment Required");

        member.setMemberCurPoint(curPoint - reinforcePrice);

        boolean success = false;
        double probability = reinforceList.get(1).getReinforceSuccessProbability();

        if(Math.random() < probability) {
            success = true;
            member.setFarmLevel(member.getFarmLevel()+1);
        }
        memberRepository.save(member);

        int curFarmEffectInt;
        int nextReinforceCost;
        int nextFarmEffectInt;
        double nextReinforceProbability;
        double[] farmEffect = new double[2];
        for(int i=0;i<2;i++){
            farmEffect[i] = (1 - reinforceList.get(i).getReinforceProductionEfficiency()) * 100;
        }
        curFarmEffectInt = (int) Math.round(farmEffect[0]);
        nextFarmEffectInt = (int) Math.round(farmEffect[1]);
        nextReinforceCost = Math.toIntExact(reinforceList.get(1).getReinforcePrice());
        nextReinforceProbability = reinforceList.get(1).getReinforceSuccessProbability() * 100;

        FarmLevelPurchaseResponse response =
                FarmLevelPurchaseResponse.create(
                    success, member, curFarmEffectInt,
                    nextReinforceCost, nextFarmEffectInt, nextReinforceProbability
                );
        return ResponseEntity.ok(response);
    }

    @Transactional
    @Override
    public ResponseEntity<?> plantSeed(PlantRequest request) {
        Member member = commonUtil.getMember();
        //씨앗 이름 검사
        Seed seed = seedRepository.findBySeedName(request.getSeedName())
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "seed not found"));

        //사용자 씨앗에 해당하는 창고 아이템 조회
        Warehouse warehouseItem = warehouseRepository.findByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategory(
                        member.getMemberPk(), seed.getAgriculture().getAgriculturePk(), 1)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "Warehouse item not found"));

        //창고 아이템의 수량을 1 감소
        if ((warehouseItem.getWarehouseAmount() - 1) <= 0) {
            warehouseRepository.delete(warehouseItem);
        } else {
            warehouseItem.setWarehouseAmount(warehouseItem.getWarehouseAmount() - 1);
            warehouseRepository.save(warehouseItem);
        }

        //심으려는 위치에 씨앗이 있는지 확인
        boolean isFarmFieldInUse = farmFieldRepository.existsByMember_MemberPkAndFarmFieldIndex(
                member.getMemberPk(), request.getFarmFieldIndex()
        );
        if(isFarmFieldInUse)
            throw new GlobalException(HttpStatus.CONFLICT, "Invalid Field");

        //해당 위치에 씨앗 심기 (효율성에 따른 시간 계산)
        Reinforce reinforce = reinforceRepository.findByReinforceLevel(member.getFarmLevel());
        double timeEfficiency = reinforce.getReinforceProductionEfficiency();
        long seedPeriod = seed.getSeedPeriod();

        // 최종 수확 시간 계산
        double harvestTime = seedPeriod * timeEfficiency;
        long finalHarvestTime = Math.round(harvestTime);

        FarmField newFarmField = new FarmField();
        newFarmField.setFarmFieldIndex(request.getFarmFieldIndex());
        newFarmField.setFarmFieldEndTime(LocalDateTime.now().plusMinutes(finalHarvestTime));
        newFarmField.setMember(member);
        newFarmField.setAgriculture(seed.getAgriculture());

        farmFieldRepository.save(newFarmField);

        List<FarmField> farmFieldList =
                farmFieldRepository.findAllByMember_MemberPk(member.getMemberPk());

        List<FarmFieldInfo> farmFieldInfoList = new ArrayList<>();
        for (FarmField farmField : farmFieldList){
            farmFieldInfoList.add(
                    FarmFieldInfo.create(farmField, farmField.getAgriculture())
            );
        }
        MemberWarehouseDTO memberWarehouseDTO = commonUtil.getMemberItem();
        PlantResponse response = PlantResponse.create(
                memberWarehouseDTO.getMember(), farmFieldInfoList,
                memberWarehouseDTO.getMemberItems()
        );

        return ResponseEntity.ok(response);
    }
}
