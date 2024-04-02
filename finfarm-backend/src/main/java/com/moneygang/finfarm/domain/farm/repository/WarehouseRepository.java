package com.moneygang.finfarm.domain.farm.repository;

import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Warehouse> findAllByMember_MemberPk(Long memberPk);

    List<Warehouse> findAllByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountAsc(Long memberPk, Long agriculturePk, Integer category);

    @Query("SELECT SUM(w.warehouseAmount) FROM warehouse_TB w " +
            "WHERE w.member.memberPk = :memberPk " +
            "AND w.agriculture.agriculturePk = :agriculturePk " +
            "AND w.warehouseCategory = :category")
    Integer sumOfWarehouseMyAgricultureCount(@Param("memberPk") Long memberPk,
                                             @Param("agriculturePk") Long agriculturePk,
                                             @Param("category") Integer category);

    List<Warehouse> findByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountAsc(
            Long memberPk, Long agriculturePk, Integer category);

    List<Warehouse> findAllByMember_MemberPkAndAgriculture_AgriculturePkAndWarehouseCategoryOrderByWarehouseAmountDesc(Long memberPk, Long agriculturePk, Integer category);
}
