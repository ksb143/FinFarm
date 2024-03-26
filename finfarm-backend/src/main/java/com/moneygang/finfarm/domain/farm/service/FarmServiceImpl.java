package com.moneygang.finfarm.domain.farm.service;


import com.moneygang.finfarm.domain.farm.dto.request.DeleteItemRequest;
import com.moneygang.finfarm.domain.farm.dto.response.DeleteItemResponse;
import com.moneygang.finfarm.domain.farm.dto.response.MyFarmResponse;
import com.moneygang.finfarm.domain.farm.dto.detail.FarmFieldInfo;
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
import com.moneygang.finfarm.domain.member.repository.ReinforceRepository;
import com.moneygang.finfarm.global.base.CommonUtil;
import com.moneygang.finfarm.global.dto.MemberWarehouseDTO;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class FarmServiceImpl implements FarmService{
    private final ReinforceRepository reinforceRepository;
    private final FarmFieldRepository farmFieldRepository;
    private final WarehouseRepository warehouseRepository;
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
}
