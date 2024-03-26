import React from 'react';

export default function MyFarmPage() {

    return(
        <div>
            <h1>this is my farm page</h1>
            {/* 개인 관련 정보: 가진 현금, 당일 퀴즈 풀었는지 여부, 이미지url, 닉네임 */}
            {/* 왼쪽: 5 * 5 개인용 가든이 있음. 자라는 작물 등이 보임. */}
            {/* 오른쪽: 창고(인벤토리 역할)이 존재함 */}
            {/* 상단: [닉네임]의 농장, 농장지력 레벨, 오늘날씨 */}
            {/* 가든 하단: 농장지력 강화하기 버튼 */}
        </div>
    );
}
