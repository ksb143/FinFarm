package com.moneygang.finfarm.domain.farm.repository;

import com.moneygang.finfarm.domain.farm.entity.FarmField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmFieldRepository extends JpaRepository<FarmField, Long> {
    List<FarmField> findAllByMember_MemberPk(Long memberPk);
    boolean existsByMember_MemberPkAndFarmFieldIndex(Long memberPk, int farmFieldIndex);
}
