import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyProfilePage from '@/pages/profile/MyProfilePage';

export default function MyPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyProfilePage />} />
      </Routes>
    </>
  );
}
