import React from 'react';
import coming_soon from '@/assets/images/coming_soon.png';

export default function MyPagePage() {

    return(
        <div>
            <h1>MY page 마이페이지 준비중!</h1>
            <img src={coming_soon} alt="img" width={1000} />
            <p>회원탈퇴 버튼</p>
            <p>개인 정보 및 세팅 변경 코너</p>
            <p>가입한 지 얼마나 되었는지</p>
            <p>오늘의 문제를 풀었는지 여부</p>
        </div>
    );
};