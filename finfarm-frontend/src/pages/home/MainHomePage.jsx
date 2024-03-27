import React from 'react';

export default function MainHomePage() {
    const name = localStorage.getItem("memberEmail")
    return(
        <div>
            <h1>this is home page</h1>
            {/* 사용자 이름이 있다면 환영 메시지와 함께 표시 */}
            <br />
            <p>환영합니다, {name}!</p>
        </div>
    );
}
