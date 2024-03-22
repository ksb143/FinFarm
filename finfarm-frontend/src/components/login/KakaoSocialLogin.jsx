import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const KakaoSocialLogin = () => {
  const navigate = useNavigate();

  const handleSuccess = async (res) => {
    console.log('성공', res);

    const { id: userName} = res.profile;

    // 서버로 토큰 전송
    // try {
    //   const response = await axios.post('http://3.34.51.157:8080/member/sign-up', {
    //     userName,
    //     accessToken,
    //     idToken,
    //     refreshToken,
    //   });
    //   console.log('Server response:', response.data);

      // 성공 시 '/home'으로 리다이렉트 및 데이터 전달
      navigate('/home', {state: {name: userName}});

    // } catch (error) {
    //   console.error('Error sending tokens to server:', error);
    // }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const KAKAO_CLIENT_token = '1d3fad946ffcf730f9a07213533d4161';

  return (
    <div>       
        <KakaoLogin
            jsKey={KAKAO_CLIENT_token}
            onSuccess={handleSuccess}
            onFailure={handleError}
        />
    </div>
  );
}

export default KakaoSocialLogin;
