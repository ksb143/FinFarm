package com.moneygang.finfarm.domain.market.repository;

import com.moneygang.finfarm.domain.market.entity.Seed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SeedRepository extends JpaRepository<Seed, Long> {
    Optional<Seed> findBySeedName(String seedName);
}
