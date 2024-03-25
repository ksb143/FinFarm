import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
<<<<<<< HEAD
import KakaoSocialLogin from '@/components/login/KakaoSocialLogin';
import Home from '@/pages/home/Home';
import Bank from '@/router/Bank';
=======

import MainHome from '@/pages/home/MainHome';
import EntrancePage from '@/pages/entrance/EntrancePage';
import RedirectPage from '@/pages/entrance/RedirectPage';
import Bank from '@/router/Bank';
import Entrance from '@/router/Entrance';

>>>>>>> cbb36b02d9de3d10040478285a2083bce5e7553e

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 px-32">
        <Navbar></Navbar>
        <Routes>
<<<<<<< HEAD
          {/* 기본 경로를 KakaoSocialLogin으로 변경 */}
          <Route path="/" element={<KakaoSocialLogin />} />
          {/* 로그인 성공 후 볼 수 있는 Home 컴포넌트 경로 추가 */}
          <Route path="/home" element={<Home />} />
          {/* 은행 관련 라우터 */}
          <Route path="bank/*" element={<Bank />} />
=======
          <Route path="/" element={<EntrancePage/>} />
          <Route path="home" element={<MainHome />} />
          <Route path="Entrance/*" element={<Entrance />} />
          <Route path="bank/*" element={<Bank />} />
          <Route path="oauth/callback/kakao" element={<RedirectPage/>} />
>>>>>>> cbb36b02d9de3d10040478285a2083bce5e7553e
        </Routes>
      </div>
    </Router>
  );
}

export default App;
