import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import MainHomePage from '@/pages/home/MainHomePage';
import EntrancePage from '@/pages/entrance/EntrancePage';
import RedirectPage from '@/pages/entrance/RedirectPage';
import Bank from '@/router/Bank';
import Entrance from '@/router/Entrance';
import MyFarm from '@/router/MyFarm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 px-32">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<EntrancePage />} />
          <Route path="oauth/callback/kakao" element={<RedirectPage />} />
          {/* 입구의 로그인, 로그아웃, 카카오로그인 */}
          <Route path="entrance/*" element={<Entrance />} />
          {/* 메인 홈 페이지 */}
          <Route path="home" element={<MainHomePage />} />
           {/* 뱅크 관련  */}
          <Route path="bank/*" element={<Bank />} />
          {/* 내농장 관련 */}
          <Route path="myfarm/*" element={<MyFarm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
