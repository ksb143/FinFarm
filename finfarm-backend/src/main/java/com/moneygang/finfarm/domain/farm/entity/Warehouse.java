package com.moneygang.finfarm.domain.farm.entity;

import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;


@Getter
@Entity(name ="warehouse_TB")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_pk")
    private Long warehousePk;

    @Column(name = "warehouse_category")
    private Integer warehouseCategory;

    @Column(name = "warehouse_amount")
    private Integer warehouseAmount;

    @ManyToOne
    @JoinColumn(name = "member_pk")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "agriculture_pk")
    private Agriculture agriculture;

    protected Warehouse() {}

    @Builder
    public Warehouse(Integer category, Integer amount, Member member, Agriculture agriculture) {
        this.warehouseCategory = category;
        this.warehouseAmount = amount;
        this.member = member;
        this.agriculture = agriculture;
    }

    public void updateSeedCount(int addCount){
        this.warehouseAmount += addCount;
    }
}
