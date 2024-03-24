import React, { useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = '434c09e04423ad80d97eb8f45f3bc229';
const REDIRECT_URI = 'http://localhost:5173/oauth/callback/kakao';

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      console.log('백엔드에 보냈음1.');
      sendCodeToBackend(code).then(() => console.log('백엔드에 보냈음2.'));
    }
  }, []);

  const sendCodeToBackend = async (code) => {
    const backendUrl = 'https://j10d203.p.ssafy.io/api/member/login';
  
    try {
      const response = await axios.post(backendUrl, {
        code, 
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Success:', response.data); 
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log('성공');
  };

  return (
    <button onClick={handleLogin}>Kakao로 로그인하기</button>
  );
};

export default KakaoLoginButton;
