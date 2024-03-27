package com.moneygang.finfarm.domain.member.repository;

import com.moneygang.finfarm.domain.member.entity.Reinforce;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReinforceRepository extends JpaRepository<Reinforce, Long> {
    List<Reinforce> findAllByReinforceLevelBetweenOrderByReinforceLevelAsc(Integer curLevel, Integer nextLevel);
}
