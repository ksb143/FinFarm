package com.moneygang.finfarm.domain.farm.repository;

import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Warehouse> findAllByMember_MemberPk(Long memberPk);

    Optional<Warehouse> findByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategory(Long memberPk, Long agriculturePk, Integer category);
    Optional<Warehouse> findByMember_MemberPkAndAgriculture_AgriculturePk(Long memberPk, Long agriculturePk);

    List<Warehouse> findByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountDesc(Long memberPk, Long agriculturePk, Integer category);
}
