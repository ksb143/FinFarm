import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainHomePage from '@/pages/home/MainHomePage';

export default function MainHome() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHomePage />} />
      </Routes>
    </>
  );
}
