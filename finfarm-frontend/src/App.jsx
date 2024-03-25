import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';

import MainHome from '@/pages/home/MainHome';
import EntrancePage from '@/pages/entrance/EntrancePage';
import RedirectPage from '@/pages/entrance/RedirectPage';
import Bank from '@/router/Bank';
import Entrance from '@/router/Entrance';


function App() {
  return (
    <Router>
      <div className="min-h-screen px-32 bg-gray-50">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<EntrancePage/>} />
          <Route path="home" element={<MainHome />} />
          <Route path="Entrance/*" element={<Entrance />} />
          <Route path="bank/*" element={<Bank />} />
          <Route path="/oauth/callback/kakao" element={<RedirectPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
