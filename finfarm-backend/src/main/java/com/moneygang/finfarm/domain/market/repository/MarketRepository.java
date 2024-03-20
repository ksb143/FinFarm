package com.moneygang.finfarm.domain.market.repository;

import com.moneygang.finfarm.domain.market.entity.Agriculture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketRepository extends JpaRepository<Agriculture, Long> {


}
