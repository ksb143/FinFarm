import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyFarmPage from '@/pages/MyFarm/MyFarmPage';

export default function MyFarm() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyFarmPage />} />
      </Routes>
    </>
  );
}
