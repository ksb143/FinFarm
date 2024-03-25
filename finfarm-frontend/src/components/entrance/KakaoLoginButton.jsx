import React from 'react';
// import axios from 'axios';

const CLIENT_ID = '434c09e04423ad80d97eb8f45f3bc229';
const REDIRECT_URI = 'https://j10d203.p.ssafy.io/oauth/callback/kakao';

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log('카카오 로그인으로 접근 성공');
  };

  return (
    <button onClick={handleLogin}>Kakao로 로그인하기</button>
  );
};

export default KakaoLoginButton;
