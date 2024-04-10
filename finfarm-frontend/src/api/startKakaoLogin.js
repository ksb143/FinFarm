const { VITE_REST_API, VITE_REDIRECT_URI } = import.meta.env;

const startKakaoLogin = async () => {
  const config = {
    response_type: 'code',
    client_id: VITE_REST_API,
    redirect_uri: VITE_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const baseURL = `https://kauth.kakao.com/oauth/authorize?${params}`;

  console.log('카카오로그인 로직을 시작함.');
  window.location.href = baseURL; // 페이지를 리디렉션 합니다.
};

export default startKakaoLogin;
