package com.moneygang.finfarm.domain.farm.service;


import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import com.moneygang.finfarm.domain.farm.dto.request.PlantRequest;
import com.moneygang.finfarm.domain.farm.dto.request.HarvestRequest;
import com.moneygang.finfarm.domain.farm.dto.response.DeleteItemResponse;
import com.moneygang.finfarm.domain.farm.dto.response.FarmLevelPurchaseResponse;
import com.moneygang.finfarm.domain.farm.dto.response.HarvestResponse;
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
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Optional;

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

    @Override
    public ResponseEntity<?> agricultureHarvest(HarvestRequest request) {
        //1. 수확할 수 있는 밭인지?
        //2. 존재하는 작물인지?
        //3. 창고에 넣기
        //3-1. 창고에 해당 이름의 농작물이 존재하는지?
        //3-1-1. 개수가 999보다 작은 슬롯이 존재하는지?
        // update 개수(+1)
        //3-1-2 개수가 999보다 작은 슬롯이 없다면
        // 창고에 빈칸 있는지 검사
        //3-2 창고에 해당 이름의 농작물이 없다면?
        //3-2-1. 창고에 빈칸이 있는지?
        // 빈칸이 있으면 insert
        // 빈칸이 없으면 예외(창고가 꽉 찼습니다)
        //4. FarmFiled delete

        Member member = commonUtil.getMember();

        //farm_field_pk로 해당 밭이 존재하는지 확인합니다.
        FarmField farmField = farmFieldRepository.findByMember_MemberPkAndFarmFieldIndex(member.getMemberPk(), request.getFarmFieldIndex())
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "farmfield not found"));

        //해당 farm_field_pk에 심어져있는 작물이 수확이 가능한 상태인지 확인합니다.
        //HttpStatus.NOT_FOUND 가 맞나요?
        LocalDateTime now = LocalDateTime.now();
        if(now.isBefore(farmField.getFarmFieldEndTime())){
            throw new GlobalException(HttpStatus.CONFLICT, "impossible time for harvest");
        }

        //밭에 심어져 있는 작물 이름이 존재하는 작물인지 확인합니다.
        Agriculture agriculture = agricultureRepository.findByAgricultureName(farmField.getAgriculture().getAgricultureName())
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "agriculture not found"));


        //창고 슬롯이 몇칸 차있는지 확인하기 위해
        int warehouseSize = warehouseRepository.findAllByMember_MemberPk(member.getMemberPk()).size();

        //창고에 해당 농작물 슬롯이 있는지 확인합니다.
        List<Warehouse> warehouseList = warehouseRepository.findByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountDesc(member.getMemberPk(), agriculture.getAgriculturePk(), 2);

        Warehouse warehouse;
        //해당 농작물이 창고에 없다면?
        if (warehouseList.isEmpty()){
            //슬롯이 꽉 차있다면?
            if (warehouseSize == 25){
                //todo: HttpStatus 확인
                throw new GlobalException(HttpStatus.CONFLICT, "warehouse is full");
            }else{
                //새롭게 추가하기
                warehouse = new Warehouse(2, 1, member, agriculture);
                warehouseRepository.save(warehouse);
            }
        }
        //해당 농작물이 창고에 존재한다면?
        else{
            boolean added = false;
            for (Warehouse wh: warehouseList){
                //슬롯이 999개 이하면 1개 추가합니다.
                if (wh.getWarehouseAmount() < 999){
                    warehouse = wh;
                    warehouse.updateSeedCount(1);
                    warehouseRepository.save(warehouse);
                    added = true;
                    break;
                }
            }
            //현재 수량이 999개라서 못넣었으면 새롭게 추가해야됨
            if (!added){
                if (warehouseSize == 25){
                    //todo: HttpStatus 확인
                    throw new GlobalException(HttpStatus.CONFLICT, "warehouse is full");
                }else{
                    //새롭게 추가하기
                    warehouse = new Warehouse(2, 1, member, agriculture);
                    warehouseRepository.save(warehouse);
                }
            }
        }

        // 수확한 작물 밭에서 제거해주기
        farmFieldRepository.deleteById(farmField.getFarmFieldPk());

        //갱신된 밭 정보 담기
        List<FarmField> farmFieldList =
                farmFieldRepository.findAllByMember_MemberPk(member.getMemberPk());

        List<FarmFieldInfo> farmFieldInfoList = new ArrayList<>();
        for (FarmField farm : farmFieldList){
            farmFieldInfoList.add(
                    FarmFieldInfo.create(farmField, farm.getAgriculture())
            );
        }

        // 갱신된 창고 정보
        MemberWarehouseDTO memberWarehouseDTO = commonUtil.getMemberItem();

        HarvestResponse response = HarvestResponse.create(member, farmFieldInfoList, memberWarehouseDTO.getMemberItems());

        return ResponseEntity.ok(response);
    }
}
