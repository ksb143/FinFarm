import { Routes, Route } from 'react-router-dom';
import BankHome from '@/pages/bank/BankHome';
import BankAccount from '@/pages/bank/BankAccount';

export default function Bank() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BankHome />} />
        <Route path="account" element={<BankAccount />} />
      </Routes>
    </>
  );
}
