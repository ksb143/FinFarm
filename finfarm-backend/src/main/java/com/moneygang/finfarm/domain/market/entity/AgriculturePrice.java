package com.moneygang.finfarm.domain.market.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity(name = "agriculture_price_TB")
public class AgriculturePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agriculture_price_pk")
    private Long agriculturePricePk;

    @Column(name = "agriculture_price_date")
    private LocalDate agriculturePriceDate;

    @Column(name = "agriculture_price_value")
    private Integer agriculturePriceValue;

    @ManyToOne
    @JoinColumn(name = "agriculture_pk")
    private Agriculture agriculture;
}
