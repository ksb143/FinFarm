import React from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 훅 추가

export default function MainHomePage() {
    const location = useLocation(); // 현재 위치의 state에 접근
    const name = location.state?.name; // 넘어온 사용자 이름을 받음

    return(
        <div>
            <h1>this is home page</h1>
            {/* 사용자 이름이 있다면 환영 메시지와 함께 표시 */}
            <br />
            {name && <p>환영합니다, {name}!</p>}
        </div>
    );
}
