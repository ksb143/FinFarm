import { useState } from "react";
import axios from 'axios';
import Button from '@/components/layout/Button'

const { VITE_REACT_API_URL } = import.meta.env;
const finfarm_URL = 'https://j10d203.p.ssafy.io/';


const SignupProcessPage = () => {
  const [nickname, setNickname] = useState('');
  const [accountPW, setAccountPW] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputNickname = e => {
    const value = e.target.value;
    if (value.length > 10 || /\s/.test(value)) {
      setError('닉네임은 10자 이내이고 공백을 포함할 수 없습니다.');
      setIsFormValid(false);
    } else {
      
      setNickname(value);
      setError('');
      checkFormValidity();
      
    }
  }

  const handleInputAccountPW = e => {
    const value = e.target.value;
    if (!/^\d{0,4}$/.test(value)) { // 숫자 4자리까지만 입력되도록 수정
      setError('계좌 비밀번호는 0부터 9까지의 숫자 4자리여야 합니다.');
      setIsFormValid(false);
    } else {
      
      setAccountPW(value);
      setError(''); // 입력 시 에러 초기화
      checkFormValidity();
      
    }
  }
  
  

  const handleFileUpload = e => {
    const file = e.target.files[0];
    const fileSize = file.size / (1024 * 1024); // 파일 크기를 MB 단위로 변환
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      setError('프로필 사진은 jpg, jpeg, png 형식만 지원합니다.');
      setIsFormValid(false);
    } else if (fileSize > 10) {
      setError('프로필 사진은 최대 10MB까지 지원합니다.');
      setIsFormValid(false);
    } else {
      
      setProfileImage(file);
      setError('');
      checkFormValidity();
    }
  }

  const checkFormValidity = () => {
    if (nickname !== '' && accountPW !== '' && profileImage !== null && error === '') {
      localStorage.setItem('memberNickname', nickname);
      localStorage.setItem('memeberAccountPassword', accountPW);
      setIsFormValid(true);

    } else {
      setIsFormValid(false);
    }
  }

  const handleSubmit = () => {
    if (isFormValid) {
      // 입력된 값들을 로컬 스토리지에 저장합니다.
      console.log("닉네임:", nickname);
      console.log("계좌 비밀번호:", accountPW);
      console.log("프로필 사진:", profileImage);
      sendDataToBackend(localStorage.getItem('memberEmail'),localStorage.getItem('memberNickname'),localStorage.getItem('memberAccountPassword'),localStorage.getItem('memberImageUrl'))
      console.log('로컬스토리지에 필요한 정보를 모두 저장했습니다.')
    }
  }

  const sendDataToBackend = async(member_email, member_nickname, memeber_accountpassword, member_imageurl) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const dataToSend = {
      memberEmail : member_email,
      memberNickname : member_nickname,
      memberAccountPassword : memeber_accountpassword,
      memberImageUrl : member_imageurl,
    };
    try {
      const res = await axios.post(`${VITE_REACT_API_URL}member/sign-up`, JSON.stringify(dataToSend), { withCredentials: true, headers });
      console.log('회원가입에 필요한 정보를 성공적으로 전달했습니다.', res.data)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }

  }

  return (
    <div>
      <h1 className="text-4xl">회원가입을 진행합니다.</h1>

      <p>1. 닉네임을 설정해주세요.</p>
      <input type="text" value={nickname} onChange={handleInputNickname} />
      {error && <p className="text-red-500">{error}</p>}

      <p>2. 계좌 비밀번호를 0~9 사이 숫자 4개로 설정해주세요.</p>
      <input type="number" value={accountPW} onChange={handleInputAccountPW} />
      {error && <p className="text-red-500">{error}</p>}

      <p>3. 프로필 사진을 설정해주세요.</p>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {error && <p className="text-red-500">{error}</p>}
      <br />
      <br />
      <Button onClick={handleSubmit} disabled={!isFormValid}>회원가입 완료</Button>
    </div>
  );
}

export default SignupProcessPage;
