package com.moneygang.finfarm.global.base;

import com.moneygang.finfarm.domain.farm.entity.Warehouse;
import com.moneygang.finfarm.domain.farm.repository.WarehouseRepository;
import com.moneygang.finfarm.domain.market.dto.detail.AgricultureInfo;
import com.moneygang.finfarm.domain.market.dto.detail.MemberItemsDTO;
import com.moneygang.finfarm.domain.market.dto.detail.SeedInfo;
import com.moneygang.finfarm.domain.market.entity.Agriculture;
import com.moneygang.finfarm.domain.market.entity.AgriculturePrice;
import com.moneygang.finfarm.domain.market.repository.AgriculturePriceRepository;
import com.moneygang.finfarm.domain.market.repository.AgricultureRepository;
import com.moneygang.finfarm.domain.member.entity.Member;
import com.moneygang.finfarm.domain.member.repository.MemberRepository;
import com.moneygang.finfarm.global.dto.MemberWarehouseDTO;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class CommonUtil {
    private final MemberRepository memberRepository;
    private final WarehouseRepository warehouseRepository;
    private final AgricultureRepository agricultureRepository;
    private final AgriculturePriceRepository agriculturePriceRepository;

    @Autowired
    public CommonUtil(MemberRepository memberRepository, WarehouseRepository warehouseRepository,
                      AgricultureRepository agricultureRepository, AgriculturePriceRepository agriculturePriceRepository){
        this.memberRepository = memberRepository;
        this.warehouseRepository = warehouseRepository;
        this.agricultureRepository = agricultureRepository;
        this.agriculturePriceRepository = agriculturePriceRepository;
    }
    public Member getMember(){
        // 현재 접속한 유저 정보를 가져오는 메서드
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        return memberRepository.findByMemberEmail(userEmail)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "user not found"));
    }

    public MemberWarehouseDTO getMemberItem(Member member){
        List<Warehouse> warehouseList = warehouseRepository.findAllByMember_MemberPk(member.getMemberPk());
        List<SeedInfo> seedInfoList = new ArrayList<>();
        List<AgricultureInfo> agricultureInfoList = new ArrayList<>();
        for(Warehouse warehouse : warehouseList){
            if(warehouse.getWarehouseCategory() == 1){ //씨앗=1
                seedInfoList.add(
                        SeedInfo.create(
                                warehouse.getAgriculture().getSeed(),
                                warehouse.getWarehouseAmount()
                        )
                );
            }else{ //농산물=2
                agricultureInfoList.add(
                        AgricultureInfo.create(
                                warehouse.getAgriculture(),
                                warehouse.getWarehouseAmount()
                        )
                );
            }
        }
        return MemberWarehouseDTO.create(
                member,
                MemberItemsDTO.create(seedInfoList, agricultureInfoList)
        );
    }

    //itemCategoryCode : 부류코드
    //itemCode : 품목코드
    //kindCode : 품종코드
    public int getPriceStatus(String itemCategoryCode, String itemCode,
                               String kindCode, long agriculturePk) throws IOException {
        int priceInt = 0;
        // 요청을 보낼 URL
        String apiUrl = "https://www.kamis.or.kr/service/price/xml.do?action=periodProductList";

        // URL에 추가할 매개변수
        String certKey = "52bbb268-a9ca-4ebb-ba35-000bde196e22"; // OPEN-API 신청내용의 API-KEY 값 작성
        String certId = "jaisung0410@gmail.com"; // OPEN-API 신청내용의 아이디 작성
        String returnType = "json"; // json:Json 데이터 형식, xml:XML데이터형식 중 원하는 데이터 형식 작성
        String startDay = LocalDate.now().toString(); // 조회 시작 날짜
        String endDay = LocalDate.now().toString(); // 조회 종료 날짜
        String convertKgYn = "Y"; // kg 단위 여부
        String productRankCode = "04"; // 등급 코드
        String countryCode = "1101"; // 소매, 도매 지역 코드
        String productClsCode = "02"; //소매(01) 도매(02) 구분

        // URL 생성
        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        final String ENCODING = "UTF-8";
        urlBuilder.append("&" + URLEncoder.encode("p_cert_key", ENCODING) + "=" + certKey);
        urlBuilder.append("&" + URLEncoder.encode("p_cert_id", ENCODING) + "=" + URLEncoder.encode(certId, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_returntype", ENCODING) + "=" + URLEncoder.encode(returnType, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_startday", ENCODING) + "=" + URLEncoder.encode(startDay, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_endday", ENCODING) + "=" + URLEncoder.encode(endDay, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_convert_kg_yn", ENCODING) + "=" + URLEncoder.encode(convertKgYn, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_itemcategorycode", ENCODING) + "=" + URLEncoder.encode(itemCategoryCode, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_itemcode", ENCODING) + "=" + URLEncoder.encode(itemCode, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_kindcode", ENCODING) + "=" + URLEncoder.encode(kindCode, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_productrankcode", ENCODING) + "=" + URLEncoder.encode(productRankCode, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_countrycode", ENCODING) + "=" + URLEncoder.encode(countryCode, ENCODING));
        urlBuilder.append("&" + URLEncoder.encode("p_productclscode", ENCODING) + "=" + URLEncoder.encode(productClsCode, ENCODING));

        // URL 연결 설정
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        // 응답 코드 확인
        int responseCode = conn.getResponseCode();
        log.info("Response Code: {}", responseCode);

        // 응답 내용 읽기
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        JSONObject rootObject = new JSONObject(response.toString());
        Object dataField = rootObject.get("data");
        // 'data'가 JSONObject일 경우
        if (dataField instanceof JSONObject dataObject) {
            // "error_code" 확인
            String errorCode = dataObject.optString("error_code", "not_found");
            if (!"000".equals(errorCode)) {return 0;}
            // 성공적인 응답 처리 로직
            JSONArray itemsArray = dataObject.getJSONArray("item");
            for (int i = 0; i < itemsArray.length(); i++) {
                JSONObject itemObject = itemsArray.getJSONObject(i);
                String countyname = itemObject.getString("countyname");

                if ("평균".equals(countyname)) {
                    String price = itemObject.getString("price");
                    price = price.replace(",", "");

                    priceInt = Integer.parseInt(price);
                    if (agriculturePk != 8 && priceInt > 0) {
                        AgriculturePrice agriculturePrice = new AgriculturePrice();

                        if (agriculturePk == 6L) { // 쌀은 10배수로 가격 측정
                            priceInt *= 10;
                        } else if (agriculturePk == 10L) { // 애호박은 가격 /20으로 가격 측정
                            priceInt /= 20;
                        }
                        agriculturePrice.setAgriculturePriceValue(priceInt);
                        agriculturePrice.setAgriculturePriceDate(LocalDate.now());

                        Agriculture agriculture = agricultureRepository.findById(agriculturePk)
                                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, "agriculture not found"));
                        agriculturePrice.setAgriculture(agriculture);

                        agriculturePriceRepository.save(agriculturePrice);
                    }
                }
            }
        } else if (dataField instanceof JSONArray) {
            return 0;
        }
        return priceInt;
    }
}
