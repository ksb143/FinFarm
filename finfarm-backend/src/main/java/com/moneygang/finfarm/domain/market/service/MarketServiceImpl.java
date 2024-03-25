package com.moneygang.finfarm.domain.market.service;

import com.moneygang.finfarm.domain.market.dto.StoreViewAllResponse;
import com.moneygang.finfarm.domain.market.dto.detail.AgricultureDTO;
import com.moneygang.finfarm.domain.market.dto.detail.AgriculturePriceHistoryDTO;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import com.moneygang.finfarm.domain.market.repository.AgriculturePriceRepository;
import com.moneygang.finfarm.domain.market.repository.AgricultureRepository;

import lombok.RequiredArgsConstructor;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {
    private final AgricultureRepository agricultureRepository;
    private final AgriculturePriceRepository agriculturePriceRepository;

    @Override
    public ResponseEntity<StoreViewAllResponse> storeView() {
        List<AgricultureDTO> agricultureDTOList = new ArrayList<>();
        for(long i=1;i<=10;i++) {
            Optional<Agriculture> agricultureOptional = agricultureRepository.findById(i);
            List<AgriculturePrice> agriculturePriceList =
                    agriculturePriceRepository.findByAgriculture_AgriculturePkAndAgriculturePriceDateBetweenOrderByAgriculturePriceDateAsc(
                            agricultureOptional.get().getAgriculturePk(),
                            LocalDate.now().minusDays(364),
                            LocalDate.now()
                    );
            System.out.println(agriculturePriceList.size());
            int minPrice = Integer.MAX_VALUE, maxPrice = Integer.MIN_VALUE;

            for (int idx = agriculturePriceList.size() - 1; idx >= agriculturePriceList.size() - 7; idx--) {
                minPrice = Math.min(minPrice, agriculturePriceList.get(idx).getAgriculturePriceValue());
                maxPrice = Math.max(maxPrice, agriculturePriceList.get(idx).getAgriculturePriceValue());
            }
            List<AgriculturePriceHistoryDTO> agriculturePriceHistoryDTOList = new ArrayList<>();
            for (AgriculturePrice agriculturePrice : agriculturePriceList) {
                agriculturePriceHistoryDTOList.add(
                        AgriculturePriceHistoryDTO.createAgriculturePriceHistoryDTO(
                                agriculturePrice.getAgriculturePriceDate(),
                                agriculturePrice.getAgriculturePriceValue()
                        )
                );
            }

            agricultureDTOList.add(
                AgricultureDTO.createAgricultureDTO(
                        agricultureOptional.get(),
                        agriculturePriceList,
                        minPrice, maxPrice,
                        agriculturePriceHistoryDTOList
                )
            );
        }
        StoreViewAllResponse storeViewAllResponse =
                StoreViewAllResponse.createStoreViewAllResponse(agricultureDTOList);

        return ResponseEntity.ok(storeViewAllResponse);
    }

    public void getPriceStatus() throws IOException {
        // 요청을 보낼 URL
        String apiUrl = "https://www.kamis.or.kr/service/price/xml.do?action=periodProductList";

        // URL에 추가할 매개변수
        String certKey = "52bbb268-a9ca-4ebb-ba35-000bde196e22"; // OPEN-API 신청내용의 API-KEY 값 작성
        String certId = "jaisung0410@gmail.com"; // OPEN-API 신청내용의 아이디 작성
        String returnType = "json"; // json:Json 데이터 형식, xml:XML데이터형식 중 원하는 데이터 형식 작성
        String startDay = "2022-03-25"; // 조회 시작 날짜
        String endDay = "2024-03-25"; // 조회 종료 날짜
        String convertKgYn = "Y"; // kg 단위 여부
        String itemCategoryCode = "200"; // 부류 코드
        String itemCode = "224"; // 품목 코드
        String kindCode = "01"; // 품종 코드
        String productRankCode = "04"; // 등급 코드
        String countryCode = "1101"; // 소매, 도매 지역 코드
        String productClsCode = "02"; //소매(01) 도매(02) 구분

        // URL 생성
        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("&" + URLEncoder.encode("p_cert_key", "UTF-8") + "=" + certKey);
        urlBuilder.append("&" + URLEncoder.encode("p_cert_id", "UTF-8") + "=" + URLEncoder.encode(certId, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_returntype", "UTF-8") + "=" + URLEncoder.encode(returnType, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_startday", "UTF-8") + "=" + URLEncoder.encode(startDay, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_endday", "UTF-8") + "=" + URLEncoder.encode(endDay, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_convert_kg_yn", "UTF-8") + "=" + URLEncoder.encode(convertKgYn, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_itemcategorycode", "UTF-8") + "=" + URLEncoder.encode(itemCategoryCode, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_itemcode", "UTF-8") + "=" + URLEncoder.encode(itemCode, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_kindcode", "UTF-8") + "=" + URLEncoder.encode(kindCode, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_productrankcode", "UTF-8") + "=" + URLEncoder.encode(productRankCode, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_countrycode", "UTF-8") + "=" + URLEncoder.encode(countryCode, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("p_productclscode", "UTF-8") + "=" + URLEncoder.encode(productClsCode, "UTF-8"));

        // URL 연결 설정
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        // 응답 코드 확인
        int responseCode = conn.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        // 응답 내용 읽기
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        JSONObject rootObject = new JSONObject(response.toString());
        JSONArray itemsArray = rootObject.getJSONObject("data").getJSONArray("item");

        for (int i = 0; i < itemsArray.length(); i++) {
            JSONObject itemObject = itemsArray.getJSONObject(i);
            String countyname = itemObject.getString("countyname");

            if ("평균".equals(countyname)) {
                String yyyy = itemObject.getString("yyyy");
                String regday = itemObject.getString("regday");
                String price = itemObject.getString("price");

                System.out.print("insert into agriculture_price_tb (agriculture_price_pk, agriculture_price_date, agriculture_price_value, agriculture_pk) values (0, ");
                regday = regday.replaceAll("/", "-");
                price = price.replaceAll(",", "");
                System.out.println("'" + yyyy + "-" + regday + "', " +  Integer.parseInt(price)/20 + ", " + 10 + ");");
            }
        }
    }
}