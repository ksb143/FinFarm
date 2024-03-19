package com.moneygang.finfarm.domain.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moneygang.finfarm.domain.farm.entity.FarmField;
import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "agriculture_TB")
public class Agriculture {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agriculture_pk")
    private Long agriculturePk;

    @Column(name = "agriculture_name")
    private String agricultureName;

    @Column(name = "agriculture_unit")
    private String agricultureUnit;

    @JsonIgnore
    @OneToMany(mappedBy = "agriculture")
    private List<FarmField> farmFieldList;

    @JsonIgnore
    @OneToMany(mappedBy = "agriculture")
    private List<Warehouse> warehouseList;

    @JsonIgnore
    @OneToMany(mappedBy = "agriculture")
    private List<AgriculturePrice> agriculturePriceList;

    @JsonIgnore
    @OneToMany(mappedBy = "agriculture")
    private List<Seed> seedList;
}
