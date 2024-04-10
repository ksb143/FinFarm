import { Routes, Route } from 'react-router-dom';
import EntrancePage from '@/pages/entrance/EntrancePage';
import SignupProcessPage from '@/pages/entrance/SignupProcessPage';

export default function Entrance() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EntrancePage />} />
        <Route path="signup" element={<SignupProcessPage />} />
      </Routes>
    </>
  );
}
