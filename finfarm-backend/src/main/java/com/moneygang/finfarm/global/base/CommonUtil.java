package com.moneygang.finfarm.global.base;

import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import com.moneygang.finfarm.domain.farm.repository.WarehouseRepository;
import com.moneygang.finfarm.domain.market.dto.detail.AgricultureInfo;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.market.dto.detail.SeedInfo;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.dto.MemberWarehouseDTO;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommonUtil {

    private final MemberRepository memberRepository;
    private final WarehouseRepository warehouseRepository;

    @Autowired
    public CommonUtil(MemberRepository memberRepository, WarehouseRepository warehouseRepository){
        this.memberRepository = memberRepository;
        this.warehouseRepository = warehouseRepository;
    }
    public Member getMember(){
        // 현재 접속한 유저 정보를 가져오는 메서드
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Member currentMember = memberRepository.findByMemberEmail(userEmail)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "user not found"));

        return currentMember;
    }

    public MemberWarehouseDTO getMemberItem(){
        Member member = getMember();
        List<Warehouse> warehouseList = warehouseRepository.findAllByMember_MemberPk(member.getMemberPk());
        List<SeedInfo> seedInfoList = new ArrayList<>();
        List<AgricultureInfo> agricultureInfoList = new ArrayList<>();
        for(Warehouse warehouse : warehouseList){
            if(warehouse.getWarehouseCategory() == 1){ //씨앗=1
                seedInfoList.add(
                        SeedInfo.create(
                                warehouse.getAgriculture().getSeed(),
                                warehouse.getWarehouseAmount()
                        )
                );
            }else{ //농산물=2
                agricultureInfoList.add(
                        AgricultureInfo.create(
                                warehouse.getAgriculture(),
                                warehouse.getWarehouseAmount()
                        )
                );
            }
        }

        return MemberWarehouseDTO.create(
                member,
                MemberItemsDTO.create(seedInfoList, agricultureInfoList)
        );
    }
}
