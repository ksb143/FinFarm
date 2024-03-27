import startKakaoLogin from "@/api/startKakaoLogin";
import KakaoImg from '@/assets/images/kakao_login_large_wide.png'

const KakaoLoginButton = ()=>{
  const buttonStyle = {
    background: `url(${KakaoImg}) center/cover`,
    width: '300px', 
    height: '40px', 
  };
  console.log('카카오로그인 버튼이 눌러졌음')
  return <button style={buttonStyle} onClick={startKakaoLogin}></button>;
};

export default KakaoLoginButton;
