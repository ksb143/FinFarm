package com.moneygang.finfarm.domain.banking.entity;

import com.moneygang.finfarm.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;


@Entity(name = "point_TB")
@Getter
public class Point {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_pk")
    private Long pointPk;

    @Column(name = "point_amount")
    private String pointAmount;

    @Column(name = "point_date")
    private LocalDateTime pointDate;

    @Column(name = "point_type")
    private String pointType; // [획득]퀴즈 풀이, 농산물 판매 ,[사용]씨앗 구매, 농장 강화

    @Column(name = "point_balance")
    private Long pointBalance;

    @ManyToOne
    @JoinColumn(name = "member_pk")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        member.getPointList().add(this);
    }
}
