package com.moneygang.finfarm.domain.store.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name = "agriculture_price_TB")
public class AgriculturePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agriculture_price_pk")
    private Long agriculturePricePk;

    @Column(name = "agriculture_price_date")
    private LocalDate agriculturePriceDate;

    @Column(name = "agriculture_price_value")
    private Long agriculturePriceValue;

    @ManyToOne
    @JoinColumn(name = "agriculture_pk")
    private Agriculture agriculture;
}
