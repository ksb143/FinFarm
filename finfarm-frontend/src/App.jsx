import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Entrance from '@/pages/loginAndSignup/Entrance';
import MainHome from '@/pages/home/MainHome';
import BankHome from '@/pages/bank/BankHome';

function App() {
  return (
    <Router>
      <div className="min-h-screen px-32 bg-gray-50">
        <Navbar></Navbar>
        <Routes>
          {/* 기본 경로를 Entrance으로 변경 */}
          <Route path='/' element={<Entrance />} />
          {/* 로그인 성공 후 볼 수 있는 Home 컴포넌트 경로 추가 */}
          <Route path='/home' element={<MainHome />} />
          {/* 로그인 성공 후 볼 수 있는 bank 컴포넌트 경로 추가 */}
          <Route path="/bank" element={<BankHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
