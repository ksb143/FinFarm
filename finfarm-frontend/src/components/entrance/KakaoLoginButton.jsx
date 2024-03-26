const REST_API = import.meta.env.VITE_REST_API;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log(KAKAO_AUTH_URL);
  };

  return <button onClick={handleLogin}>Kakao로 로그인하기</button>;
};

export default KakaoLoginButton;
