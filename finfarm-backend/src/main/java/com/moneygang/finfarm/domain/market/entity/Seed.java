package com.moneygang.finfarm.domain.market.entity;

import jakarta.persistence.*;

@Entity(name = "seed_TB")
public class Seed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seed_pk")
    private Long seedPk;

    @Column(name = "seed_name")
    private String seedName;

    @Column(name = "seed_content")
    private String seedContent;

    @Column(name = "seed_price")
    private Integer seedPrice;

    @Column(name = "seed_period")
    private Long seedPeriod;

    @ManyToOne
    @JoinColumn(name = "agriculture_pk")
    private Agriculture agriculture;

}
