package com.moneygang.finfarm.domain.member.entity;

import jakarta.persistence.*;

@Entity(name = "reinforce_TB")
public class Reinforce {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reinforce_pk")
    private Long reinforcePk;

    @Column(name = "reinforce_level")
    private Integer reinforceLevel;

    @Column(name = "reinforce_success_probability")
    private Double reinforceSuccessProbability;

    @Column(name = "reinforce_production_efficiency")
    private Double reinforceProductionEfficiency;

    @Column(name = "reinforce_price")
    private Long reinforcePrice;
}
