import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import EntrancePage from '@/pages/entrance/EntrancePage';
import RedirectPage from '@/pages/entrance/RedirectPage';

import Bank from '@/router/Bank';
import Market from '@/router/Market';
import Entrance from '@/router/Entrance';
import MyFarm from '@/router/MyFarm';
import MyPage from '@/router/MyPage';
import MainHome from '@/router/MainHome';

import useUserStore from '@/store/userStore';

function App() {
  const { accessToken: accessToken } = useUserStore((state) => ({
    accessToken: state.accessToken,
  }));
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
    </Router>
  );
}

export default App;
