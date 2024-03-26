<<<<<<< HEAD
const REST_API = import.meta.env.VITE_REST_API;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;
=======
import React from 'react';
import KakaoImg from '@/assets/images/kakao_login_large_wide.png'
// import axios from 'axios';

const CLIENT_ID = '434c09e04423ad80d97eb8f45f3bc229';
const REDIRECT_URI = 'https://j10d203.p.ssafy.io/oauth/callback/kakao';
>>>>>>> f685b6e16798c80bab65eb8c9000328614f6a646

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log(KAKAO_AUTH_URL);
  };
  const buttonStyle = {
    background: `url(${KakaoImg}) center/cover`, // 배경 이미지 설정
    width: '600px', 
    height: '70px', 
  };

<<<<<<< HEAD
  return <button onClick={handleLogin}>Kakao로 로그인하기</button>;
=======
  return (
    <button style={buttonStyle} onClick={handleLogin}/>
  );
>>>>>>> f685b6e16798c80bab65eb8c9000328614f6a646
};

export default KakaoLoginButton;
