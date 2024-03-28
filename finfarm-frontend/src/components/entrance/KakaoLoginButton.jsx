import startKakaoLogin from "@/api/startKakaoLogin";
import KakaoImg from '@/assets/images/kakao_login_large_wide.png'
import KakaoImg2 from '@/assets/images/kakao_login_large_narrow.png'
import KakaoImg3 from '@/assets/images/kakao_login_medium_wide.png'
import KakaoImg4 from '@/assets/images/kakao_login_medium_narrow.png'

const KakaoLoginButton = ()=>{
  const buttonStyle = {
    background: `url(${KakaoImg4}) center/cover`,
    width: '180px', 
    height: '30px', 
  };
  console.log('카카오로그인 버튼이 눌러졌음')
  return <button style={buttonStyle} onClick={startKakaoLogin}></button>;
};

export default KakaoLoginButton;
