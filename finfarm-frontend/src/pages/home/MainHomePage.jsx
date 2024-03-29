import React, {useEffect} from 'react';
import entrance4 from '@/assets/images/entrance4.png';
import useUserStore from "@/store/userStore";

export default function MainHomePage() {
    // 전역상태관리 import 로직
  const { 
    accessToken: accessToken,
    nickname: nickname,
  } = useUserStore(state => ({
    accessToken: state.accessToken,
    nickname: state.nickname,
  }));

    return(
        <div>
          <img src={entrance4}  width='500px' />
          <p className='text-5xl'>환영합니다, {nickname}님!</p>
        </div>
    );
}
