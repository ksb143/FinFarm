import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';
import axios from 'axios';
const { VITE_REACT_API_URL } = import.meta.env;
import loading from '@/assets/images/loading.gif';

const RedirectPage = () => {
  // 전역상태관리 수정 로직
  const {
    setAccessToken,
    setPointsInthePocket,
    setProfileImageUrl,
    setNickname,
    setIsQuizSolved,
    setDateOfSignup,
    setEmail,
  } = useUserStore((state) => ({
    setAccessToken: state.setAccessToken,
    setPointsInthePocket: state.setPointsInthePocket,
    setProfileImageUrl: state.setProfileImageUrl,
    setNickname: state.setNickname,
    setIsQuizSolved: state.setIsQuizSolved,
    setDateOfSignup: state.setDateOfSignup,
    setEmail: state.setEmail,
  }));

  const navigate = useNavigate();
  useEffect(() => {
    console.log(import.meta.env.VITE_REDIRECT_URI); // 현재 설정된 REDIRECT_URI 확인
    // URL에서 인가 코드를 추출합니다.
    const auth_code0 = new URLSearchParams(window.location.search).get('code');
    if (auth_code0) {
      console.log('인가코드가 존재하므로, 이것을 백엔드로 보냅니다.');
      console.log(auth_code0);
      sendCodeToBackend(auth_code0);
      console.log(
        '추출한 인가코드를 백엔드에 보냈습니다. 백에서 잘 받았을까요?',
      );
    } else {
      console.log('주소창에 추출할 인가코드가 없습니다. 힘내세요! ㅠㅠ');
    }
  }, []);

  const sendCodeToBackend = async (code) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataToSend = {
      authCode: code, // 여기서 'code'를 'authCode' 키의 값으로 설정
    };

    try {
      const res = await axios.post(
        `${VITE_REACT_API_URL}member/login`,
        dataToSend,
        { withCredentials: true, headers },
      );

      console.log(
        '백엔드에서 인가코드를 잘 받았고, 응답을 줬습니다.',
        res.data,
      );

      localStorage.clear();
      localStorage.setItem('accessToken', res.data.accessToken);
      setAccessToken(res.data.accessToken);

      if (res.data.member) {
        // member: True 인 경우, 로그인 처리
        console.log(`안녕하세요, ${res.data.memberNickname}님! 환영합니다.`);
        // 받은 모든 정보를 zustand store에 저장하고, 메인홈으로 이동.
        setPointsInthePocket(res.data.memberCurPoint);
        setProfileImageUrl(res.data.memberImageUrl);
        setNickname(res.data.memberNickname); // 진짜 닉네임을 저장함.
        setIsQuizSolved(res.data.memberSolveQuiz);
        setDateOfSignup(res.data.memberCreateDate);

        console.log('로그인완료. 메인화면으로 곧 이동합니다.');
        navigate('/home');
      } else {
        // member: False 인 경우, 회원가입 진행
        console.log(
          '회원이 아닙니다. 회원가입 페이지로 이동하여 진행해주세요.',
        );
        // 회원이 아닐 경우에도 백엔드로 이동하도록 수정할 수 있습니다.
        localStorage.setItem('email', res.data.memberNickname);
        setEmail(res.data.memberNickname); // 실제로 온 것은 이메일임.

        console.log(
          '회원가입 준비 중. 이메일 저장완료. 회원가입 페이지로 곧 이동합니다.',
        );
        navigate('/entrance/signup');
      }
    } catch (error) {
      // Todo.[에러핸들링] 어떤 에러인가에 따라서 사용자에게 더 명확한 피드백을 주는 것이 나아 보임.
      // 특정 에러 별로 각각 다른 페이지로 리다이렉션 필요.
      if (error.response) {
        // 서버가 2xx 범위 외의 상태 코드로 응답한 경우
        console.error('Error response', error.response.data);
        console.error('Error status', error.response.status);
        console.error('Error headers', error.response.headers);
      } else if (error.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우
        console.error('Error request', error.request);
      } else {
        // 요청을 설정하는 동안에 문제가 발생한 경우
        console.error('Error message', error.message);
      }
      console.error('Error config', error.config);
    }
  };

  return (
    <div>
      <img src={loading} alt="loading" width={200} />
    </div>
  );
};

export default RedirectPage;
