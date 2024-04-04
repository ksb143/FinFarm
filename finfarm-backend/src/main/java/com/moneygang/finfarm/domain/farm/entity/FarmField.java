package com.moneygang.finfarm.domain.farm.entity;

import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity(name = "farm_field_TB")
public class FarmField {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farm_field_pk")
    private Long farmFieldPk;

    @Column(name = "farm_field_index")
    private Integer farmFieldIndex;

    @Column(name = "farm_field_end_time")
    private LocalDateTime farmFieldEndTime;

    @ManyToOne
    @JoinColumn(name = "member_pk")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "agriculture_pk")
    private Agriculture agriculture;
}
