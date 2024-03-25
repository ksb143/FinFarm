package com.moneygang.finfarm.domain.market.repository;

import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AgriculturePriceRepository extends JpaRepository<AgriculturePrice, Long> {
    //농산물 PK에 해당하는 농산물 가격을 start, end 날짜 기준으로 들고오기
    List<AgriculturePrice> findAllByAgriculture_AgriculturePkAndAgriculturePriceDateBetweenOrderByAgriculturePriceDateAsc(
            Long agricultureId, LocalDate startDate, LocalDate endDate);
}