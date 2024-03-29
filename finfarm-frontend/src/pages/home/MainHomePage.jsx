import React, {useEffect} from 'react';
import entrance4 from '@/assets/images/entrance4.png';
import useUserStore from "@/store/userStore";

export default function MainHomePage() {
    // 전역상태관리 import 로직
  const { 
    accessToken: accessToken,
    nickname: nickname,
    email: email,
    pointsInthePocket: pointsInthePocket,
    profileImageUrl: profileImageUrl,
    isQuizSolved: isQuizSolved,
    dateOfSignup: dateOfSignup,
    accountPassword:  accountPassword, 
  } = useUserStore(state => ({
    accessToken: state.accessToken,
    nickname: state.nickname,
    email: state.email,
    pointsInthePocket: state.pointsInthePocket,
    profileImageUrl: state.profileImageUrl,
    isQuizSolved: state.isQuizSolved,
    dateOfSignup: state.dateOfSignup,
    accountPassword: state.accountPassword,
  }));
  useEffect(() => {
    // 페이지가 로드되자마자 새로고침
    window.location.reload();
}, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 실행되도록 함
    return(
        <div>
            <h1 className='text-2xl'>Main home page</h1>
            <br />
            <br />
            <p className='text-5xl'>환영합니다, {nickname}님!</p>
            <img src={entrance4}  width='500px' />
        </div>
    );
}
