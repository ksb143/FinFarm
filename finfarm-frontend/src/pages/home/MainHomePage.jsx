import React from 'react';
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
  window.location.href('https://j10d203.p.ssafy.io/home')
    return(
        <div>
            <h1 className='text-2xl'>this is main home page</h1>
            
            <br />
            <p className='text-5xl'>환영합니다, {nickname}님!</p>
            <img src={entrance4}  width='500px' />
        </div>
    );
}
