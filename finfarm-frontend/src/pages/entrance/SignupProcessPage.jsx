import { useState } from 'react';
import { useNavigate, Form, redirect } from 'react-router-dom';
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

  const navigate = useNavigate();
  const [nickname0, setNickname0] = useState('');
  const [accountPW0, setAccountPW0] = useState('');
  const [visibleDuplication, setVisibleDuplication] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [visibleAvailability, setVisibleAvailability] = useState(false);
  const [isAvailability, setIsAvailability] = useState(true);

  const handleInputNickname = (e) => {
    const value = e.target.value;
    setNickname0(value); // input된대로 nickname의 state를 변경함
    setNickname(value); // useUserStore에 닉네임 저장함.
  };

  const handleInputAccountPW = (e) => {
    const value = e.target.value;
    setAccountPW0(value); // input된대로 account_pw의 state를 변경함
    setAccountPassword(value); // useUserStore에 계좌 비번 저장함.
  };

  // 중복 검사
  const duplicateCheck = async () => {
    if (!nickname0) {
      alert('닉네임을 작성해주세요');
      return;
    }
    try {
      const res = await axios.get(
        `${VITE_REACT_API_URL}member/nickname/is-exist/${nickname0}`,
      );
      setIsDuplicated(res.data.exist);
    } catch (error) {
      console.log('닉네임 중복 검사 실패');
      console.error(error);
    }
    setVisibleDuplication(true);
  };

  // 비밀번호 유효성 검사
  const availabilityCheck = () => {
    if (!accountPW0) {
      alert('비밀번호를 작성해주세요');
      return;
    }

    if (accountPW0) {
      const isValid = /^[0-9]{4}$/.test(accountPW0);
      setIsAvailability(isValid);
    }

    setVisibleAvailability(true);
  };

  const handleSubmit = () => {
    if (!visibleDuplication || isDuplicated) {
      alert('닉네임 중복 되었는지 다시 한 번 체크해주세요');
      return;
    }
    if (!visibleAvailability || !isAvailability) {
      alert('계좌 비밀번호 유효한지 다시 한 번 체크해주세요');
      return;
    }
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
    <div className="relative h-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-gray-200 p-8">
        <h1 className="mb-5 text-center text-4xl">회원가입을 진행합니다.</h1>
        <p className="text-xl">1. 닉네임을 5글자 이내로 설정해주세요.</p>
        <div className="flex items-center gap-10">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="닉네임"
              value={nickname0}
              onChange={handleInputNickname}
              maxLength={5}
            />
          </label>
          <button
            className="hover:bg- min-w-28 rounded-full bg-lime-500 px-5 py-1 text-white hover:border-4 hover:border-gray-300 hover:bg-lime-950"
            onClick={duplicateCheck}
          >
            중복 검사
          </button>
        </div>
        {visibleDuplication && isDuplicated && (
          <span className="text-xs text-red-600">닉네임이 중복되었습니다</span>
        )}
        {visibleDuplication && !isDuplicated && (
          <span className="text-xs text-blue-600">
            닉네임이 중복되지 않았습니다
          </span>
        )}
        <div>
          <div>
            <p className="text-xl">
              2. 계좌 비밀번호를 0~9 사이 숫자 4글자로 설정해주세요.
            </p>
            <div className="flex items-center gap-10">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  value={accountPW0}
                  onChange={handleInputAccountPW}
                  maxLength={4}
                />
              </label>
              <button
                className="hover:bg- min-w-28 rounded-full bg-lime-500 px-5 py-1 text-white hover:border-4 hover:border-gray-300 hover:bg-lime-950"
                onClick={availabilityCheck}
              >
                유효성 검사
              </button>
            </div>
            {visibleAvailability && !isAvailability && (
              <span className="text-xs text-red-600">
                비밀번호가 조건에 부합하지 않습니다
              </span>
            )}
            {visibleAvailability && isAvailability && (
              <span className="text-xs text-blue-600">
                비밀번호가 조건에 부합합니다
              </span>
            )}
          </div>
        </div>
        <button
          className="hover:borer-4 btn mt-10 w-full rounded-lg bg-lime-500 font-hopang text-xl text-white hover:border-4 hover:border-double hover:border-gray-300 hover:bg-lime-950"
          onClick={handleSubmit}
        >
          회원가입 하기
        </button>
      </div>
    </div>
  );
};

export default SignupProcessPage;
