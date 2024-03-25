import React from "react";
import { Routes, Route } from 'react-router-dom';
import EntrancePage from '@/pages/entrance/EntrancePage';
import LoginPage from '@/pages/entrance/LoginPage';
import SignupPage from '@/pages/entrance/SignupPage';

export default function Entrance() {
    return (
        <>
            <Routes>
                <Route path="/" element={<EntrancePage />} />
                <Route path="login" element={<LoginPage/>} />
                <Route path="signup" element={<SignupPage/>} />
            </Routes>
        </>
    )
}