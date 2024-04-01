import { useState } from 'react';
import { useNavigate, useActionData, Form, redirect } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '@/store/userStore';
const { VITE_REACT_API_URL } = import.meta.env;

const SignupProcessPage = () => {
  // 전역상태관리 수정 로직
  const {
    setAccountPassword,
    setAccessToken,
    setPointsInthePocket,
    setProfileImageUrl,
    setNickname,
    setIsQuizSolved,
    setDateOfSignup,
    setEmail,
    setTimeQuizSolve,
  } = useUserStore((state) => ({
    setAccountPassword: state.setAccountPassword,
    setAccessToken: state.setAccessToken,
    setPointsInthePocket: state.setPointsInthePocket,
    setProfileImageUrl: state.setProfileImageUrl,
    setNickname: state.setNickname,
    setIsQuizSolved: state.setIsQuizSolved,
    setDateOfSignup: state.setDateOfSignup,
    setEmail: state.setEmail,
    setTimeQuizSolve: state.setTimeQuizSolve,
  }));
  // 전역상태관리 import 로직
  const {
    accessToken: accessToken,
    nickname: nickname,
    email: email,
    pointsInthePocket: pointsInthePocket,
    profileImageUrl: profileImageUrl,
    isQuizSolved: isQuizSolved,
    dateOfSignup: dateOfSignup,
    accountPassword: accountPassword,
    timeQuizSolve: timeQuizSolve,
  } = useUserStore((state) => ({
    accessToken: state.accessToken,
    nickname: state.nickname,
    email: state.email,
    pointsInthePocket: state.pointsInthePocket,
    profileImageUrl: state.profileImageUrl,
    isQuizSolved: state.isQuizSolved,
    dateOfSignup: state.dateOfSignup,
    accountPassword: state.accountPassword,
    timeQuizSolve: state.timeQuizSolve,
  }));

  const actionData = useActionData();
  const navigate = useNavigate();
  const [nickname0, setNickname0] = useState('');
  const [accountPW0, setAccountPW0] = useState('');

  const handleInputNickname = (e) => {
    // Todo.Todo.Todo. input 된 nickname의 중복검사 및 유효성검사 필요
    
    const value = e.target.value;
    setNickname0(value); // input된대로 nickname의 state를 변경함
    setNickname(value); // useUserStore에 닉네임 저장함.
    console.log('zustand에 회원의 닉네임을(를) 저장했습니다.');
  };

  const handleInputAccountPW = (e) => {
    // Todo.Todo.Todo. input 된 account pw의 유효성검사 필요
    
    const value = e.target.value;
    setAccountPW0(value); // input된대로 account_pw의 state를 변경함
    setAccountPassword(value); // useUserStore에 계좌 비번 저장함.
    console.log('zustand에 회원의 계좌 비밀번호을(를) 저장했습니다.');
  };

  const handleSubmit = () => {
    console.log('회원가입 버튼이 눌러졌습니다.');
    console.log('닉네임: ', nickname0);
    console.log('계좌 비밀번호: ', accountPW0);

    sendDataToBackend(email, nickname, accountPassword, profileImageUrl);
  };

  const sendDataToBackend = async (email, nickname, acc_pw, img_url) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const dataToSend = {
      memberEmail: email,
      memberNickname: nickname,
      memberAccountPassword: acc_pw,
      memberImageUrl: img_url,
    };
    try {
      const res = await axios.post(
        `${VITE_REACT_API_URL}member/sign-up`,
        JSON.stringify(dataToSend),
        { withCredentials: true, headers },
      );
      console.log(
        '회원가입에 필요한 정보를 성공적으로 백엔드에 전달했습니다.',
        res.data,
      );

      console.log('웹사이트 입구로 이동합니다.');
      navigate('/entrance');
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };
  return (
    <div>
      <h1 className="text-4xl">회원가입을 진행합니다.</h1>

      <div>
            <p className='text-xl'>1. 5자 이하로 닉네임을 설정해주세요.</p>
            <input type="text" value={nickname0} />
            <button type="submit" onClick={handleInputNickname}>
              중복검사
            </button>
      </div>

      <div>
          <p className='text-xl'>2. 계좌 비밀번호를 0~9 사이 숫자 4글자로 설정해주세요.</p>
          <input type="number" value={accountPW0} onChange={handleInputAccountPW} />
      </div>
      <br />
      <br />
      <button
        className="btn btn-sm min-w-16 rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800"
        onClick={handleSubmit}
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default SignupProcessPage;
