package com.moneygang.finfarm.domain.store.repository;

import com.moneygang.finfarm.domain.store.entity.Agriculture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Agriculture, Long> {


}
