package com.moneygang.finfarm.global.base;


import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import com.moneygang.finfarm.domain.market.repository.AgriculturePriceRepository;
import com.moneygang.finfarm.domain.market.repository.AgricultureRepository;
import com.moneygang.finfarm.global.exception.GlobalException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AgriculturePriceScheduler {
    private final CommonUtil commonUtil;
    private final AgriculturePriceRepository agriculturePriceRepository;
    private final AgricultureRepository agricultureRepository;

    @Transactional
    @Scheduled(cron = "00 00 16 * * *")
    public void agriculturePriceScheduledTasks() throws IOException {
        log.info("스케줄러 실행");
        // 1 : 고구마
        // 2 : 감자
        // 3 : 마늘
        // 4 : 대파
        // 5 : 양파
        // 6 : 쌀 (가격을 *10 해야함)
        // 7 : 당근
        // 8 : 배추 (4가지 계절에 따라서 고려해서 해야함) -> 4번 쏴서 평균가를 내린다
        // 9 : 수박
        // 10 : 애호박 (가격을 /20 해야함)
        ArrayList<String> itemCategoryCode = new ArrayList<>(Arrays.asList("0", "100", "100", "200", "200", "200", "100", "200", "", "200", "200"));
        ArrayList<String> itemCode = new ArrayList<>(Arrays.asList("0", "151", "152", "258", "246", "245", "111", "232", "", "221", "224"));
        ArrayList<String> kindCode = new ArrayList<>(Arrays.asList("0", "00", "01", "03", "00", "00", "01", "01", "", "00", "01"));

        for(long agriculturePk=1; agriculturePk<=10; agriculturePk++){
            if(agriculturePk==8){ //배추 (봄, 여름, 가을, 월동)
                String napaCabbageItemCategoryCode = "200";
                String napaCabbageItemCode = "211";
                ArrayList<String> napaCabbageKindCode = new ArrayList<>(Arrays.asList("01", "02", "03", "06"));
                int avgPrice = 0;
                int div = 0;
                for(int loop=0; loop<4; loop++){
                    int beforeAvgPrice = avgPrice;
                    avgPrice += commonUtil.getPriceStatus(
                            napaCabbageItemCategoryCode,
                            napaCabbageItemCode,
                            napaCabbageKindCode.get(loop),
                            agriculturePk
                    );
                    if(beforeAvgPrice != avgPrice){
                        div++;
                    }
                }
                if(avgPrice > 0 && div > 0) {
                    AgriculturePrice agriculturePrice = new AgriculturePrice();

                    agriculturePrice.setAgriculturePriceValue(avgPrice / div);
                    agriculturePrice.setAgriculturePriceDate(LocalDate.now());

                    Agriculture agriculture = agricultureRepository.findById(agriculturePk)
                            .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "agriculture not found"));
                    agriculturePrice.setAgriculture(agriculture);

                    agriculturePriceRepository.save(agriculturePrice);
                }
            }else{ //배추 이외
                commonUtil.getPriceStatus(
                        itemCategoryCode.get((int) agriculturePk),
                        itemCode.get((int) agriculturePk),
                        kindCode.get((int) agriculturePk),
                        agriculturePk
                );
            }
        }
    }
}
