package com.moneygang.finfarm.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moneygang.finfarm.domain.banking.entity.Account;
import com.moneygang.finfarm.domain.banking.entity.LoanHistory;
import com.moneygang.finfarm.domain.banking.entity.Point;
import com.moneygang.finfarm.domain.farm.entity.FarmField;
import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@DynamicUpdate // Dirty Checking으로 인한 update 시, 변경된 속성만 변경
@NoArgsConstructor
@AllArgsConstructor
@Table(name="member_TB")
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_pk")
    private Long memberPk;

    @Column(name = "member_email")
    private String memberEmail;

    @Column(name = "member_nickname")
    private String memberNickname;

    @Column(name = "member_account_password")
    private String memberAccountPassword;

    @Column(name = "member_solve_quiz")
    private boolean memberSolveQuiz;

    @Column(name = "member_cur_point")
    private Long memberCurPoint;

    @Column(name = "member_image_url")
    private String memberImageUrl;

    @Column(name = "member_date")
    private LocalDate memberCreateDate;

    @Column(name = "member_farm_level")
    private Integer farmLevel;

    @Column(name = "member_loan_overdue")
    private boolean memberLoanOverdue;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<FarmField> farmFieldList;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Warehouse> warehouseList;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Point> pointList;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<LoanHistory> loanHistoryList;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Account> accountList;


    public void updateCurPoint(Long amount) {
        this.memberCurPoint += amount;
    }

    public void changeAccountPassword(String changeAccountPassword) {
        this.memberAccountPassword = changeAccountPassword;
    }

    public void loanOverDue() {
        this.memberLoanOverdue = true;
    }
}
