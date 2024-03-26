import React from 'react';
import KakaoImg from '@/assets/images/kakao_login_large_wide.png'
// import axios from 'axios';

const CLIENT_ID = '434c09e04423ad80d97eb8f45f3bc229';
const REDIRECT_URI = 'https://j10d203.p.ssafy.io/oauth/callback/kakao';

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log('카카오 로그인으로 접근 성공');
  };
  const buttonStyle = {
    background: `url(${KakaoImg}) center/cover`, // 배경 이미지 설정
    width: '600px', 
    height: '70px', 
  };

  return (
    <button style={buttonStyle} onClick={handleLogin}/>
  );
};

export default KakaoLoginButton;
