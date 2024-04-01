import React, {useEffect} from 'react';
import entrance4 from '@/assets/images/entrance4.png';
import useUserStore from "@/store/userStore";

export default function MainHomePage() {
    // 전역상태관리 import 로직
  const { 
    nickname: nickname,
  } = useUserStore(state => ({
    nickname: state.nickname,
  }));

    return(
        <div>
          <img src={entrance4}  width='500px' />
          <p className='text-5xl'>환영합니다, {nickname}님!</p>
          <div>Quiz</div>
          <p>퀴즈를 풀 수 있는 검사하는 버튼...api 호출</p>
          <p>퀴즈를 풀수 있다면 퀴즈 시작하기 활성화</p>
          <p>퀴즈를 풀어서 맞추었다면 점수를 얻는 api 호출</p>
        </div>
    );
}
