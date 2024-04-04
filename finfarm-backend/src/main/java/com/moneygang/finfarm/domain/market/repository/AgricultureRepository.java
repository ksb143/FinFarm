package com.moneygang.finfarm.domain.market.repository;

import com.moneygang.finfarm.domain.market.entity.Agriculture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgricultureRepository extends JpaRepository<Agriculture, Long> {
    Optional<Agriculture> findByAgricultureName(String agricultureName);

}
