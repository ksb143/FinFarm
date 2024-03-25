package com.moneygang.finfarm.domain.farm.repository;

import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Warehouse> findAllByMember_MemberPk(Long memberPk);
}
