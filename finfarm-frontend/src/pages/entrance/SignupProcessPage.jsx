import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { VITE_REACT_API_URL } = import.meta.env;

const SignupProcessPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [accountPW, setAccountPW] = useState('');

  const handleInputNickname = e => {
    const value = e.target.value;
    setNickname(value);
    localStorage.setItem('memberNickname',value);
    console.log('로컬스토리지에 회원의 닉네임을(를) 저장했습니다.');
  }

  const handleInputAccountPW = e => {
    const value = e.target.value;
    setAccountPW(value);
    localStorage.setItem('memberAccountPassword',value);
    console.log('로컬스토리지에 회원의 계좌 비밀번호을(를) 저장했습니다.');
  }

  const handleSubmit = () => {
    console.log('회원가입 버튼이 눌러졌습니다.')
    // 입력된 값들을 로컬 스토리지에 저장합니다.
    
    console.log("닉네임: ", nickname);
    console.log("계좌 비밀번호: ", accountPW);
    sendDataToBackend(localStorage.getItem('memberEmail'),localStorage.getItem('memberNickname'),localStorage.getItem('memberAccountPassword'))
  }

  const sendDataToBackend = async(member_email, member_nickname, memeber_accountpassword) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const dataToSend = {
      memberEmail : member_email,
      memberNickname : member_nickname,
      memberAccountPassword : memeber_accountpassword,
      memberImageUrl : "member_imageurl",
    };
    try {
      const res = await axios.post(`${VITE_REACT_API_URL}member/sign-up`, JSON.stringify(dataToSend), { withCredentials: true, headers });
      console.log('회원가입에 필요한 정보를 성공적으로 전달했습니다.', res.data)
      console.log('웹사이트 입구로 이동합니다.')
      navigate('/entrance');

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }
  return (
    <div>
      <h1 className="text-4xl">회원가입을 진행합니다.</h1>

      <p>1.  5자 이하로 닉네임을 설정해주세요.</p>
      <input type="text" value={nickname} onChange={handleInputNickname} />

      <p>2. 계좌 비밀번호를 0~9 사이 숫자 4글자로 설정해주세요.</p>
      <input type="number" value={accountPW} onChange={handleInputAccountPW} />

      <br />
      <br />
      <button className="btn btn-sm min-w-16 rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800" onClick={handleSubmit}>회원가입 완료</button>
    </div>
  );
}

export default SignupProcessPage;
