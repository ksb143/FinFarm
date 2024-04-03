import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EntrancePage from '@/pages/entrance/EntrancePage';
import RedirectPage from '@/pages/entrance/RedirectPage';

import Bank from '@/router/Bank';
import Market from '@/router/Market';
import Entrance from '@/router/Entrance';
import MyFarm from '@/router/MyFarm';
import MyPage from '@/router/MyPage';
import MainHome from '@/router/MainHome';

import useUserStore from '@/store/userStore';

// 배경음 파일을 import합니다.
import backgroundSong from '@/assets/sounds/background_song.mp3';

function App() {
  const { accessToken: accessToken } = useUserStore((state) => ({
    accessToken: state.accessToken,
  }));

  useEffect(() => {
    const audio = new Audio(backgroundSong);
    audio.loop = true; // 배경음을 반복 재생합니다.
    audio.play().catch((error) => console.log(error)); // 자동 재생 정책으로 인한 에러 처리

    return () => {
      audio.pause(); // 컴포넌트가 언마운트될 때 오디오를 일시 정지합니다.
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 px-32">
        {accessToken && <Navbar></Navbar>}
        <Routes>
          <Route path="/" element={<EntrancePage />} />
          {/* 카카오 로그인시, 리다이렉션 진행 페이지 */}
          <Route path="oauth/callback/kakao" element={<RedirectPage />} />
          {/* 입구. 카카오로그인 -> 웹 로그인 및 회원가입 진행함. */}
          <Route path="entrance/*" element={<Entrance />} />
          {/* 메인 홈 페이지. 퀴즈를 풀 수 있고, 다양한 갈림길을 확인할 수 있음. */}
          <Route path="home/*" element={<MainHome />} />
          {/* 뱅크 관련 페이지들. */}
          <Route path="bank/*" element={<Bank />} />
          {/* 내농장 관련 페이지들. */}
          <Route path="myfarm/*" element={<MyFarm />} />
          {/* 장터 관련 페이지들 */}
          <Route path="market/*" element={<Market />} />
          {/* 마이페이지 관련 페이지들 */}
          <Route path="mypage/*" element={<MyPage />} />
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;
