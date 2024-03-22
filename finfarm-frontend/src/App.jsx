import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import KakaoSocialLogin from '@/components/login/KakaoSocialLogin';
import Home from '@/pages/home/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen px-32 bg-gray-50">
        <Navbar></Navbar>
        <Routes>
          {/* 기본 경로를 KakaoSocialLogin으로 변경 */}
          <Route path='/' element={<KakaoSocialLogin />} />
          {/* 로그인 성공 후 볼 수 있는 Home 컴포넌트 경로 추가 */}
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
