import { useState } from "react";

const SignupProcessPage = () => {
  const [nickname, setNickname] = useState('');
  const [accountPW, setAccountPW] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleInputNickname = e => {
    setNickname(e.target.value);
  }

  const handleInputAccountPW = e => {
    setAccountPW(e.target.value);
  }

  const handleFileUpload = e => {
    const file = e.target.files[0];
    setProfileImage(file);
  }

  const handleSubmit = () => {
    // 입력받은 값들을 서버로 전송하거나 다음 단계로 이동하는 로직을 추가할 수 있습니다.
    console.log("닉네임:", nickname);
    console.log("계좌 비밀번호:", accountPW);
    console.log("프로필 사진:", profileImage);
    // 여기에 서버로 데이터를 전송하거나 다음 단계로 이동하는 로직을 추가할 수 있습니다.
  }

  return (
    <div>
      <h1 className="text-4xl">회원가입을 진행합니다.</h1>

      <p>1. 닉네임을 설정해주세요.</p>
      <input type="text" value={nickname} onChange={handleInputNickname} />

      <p>2. 계좌 비밀번호를 0~9 사이 숫자 4개로 설정해주세요.</p>
      <input type="password" value={accountPW} onChange={handleInputAccountPW} />

      <p>3. 프로필 사진을 설정해주세요.</p>
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      <button onClick={handleSubmit}>다음 단계로 진행</button>
    </div>
  );
}

export default SignupProcessPage;
