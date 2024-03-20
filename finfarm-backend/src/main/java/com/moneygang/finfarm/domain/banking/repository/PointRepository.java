package com.moneygang.finfarm.domain.banking.repository;

import com.moneygang.finfarm.domain.banking.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Long> {
}
