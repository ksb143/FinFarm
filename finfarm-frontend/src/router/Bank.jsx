import { Routes, Route } from 'react-router-dom';
import BankHomePage from '@/pages/bank/BankHomePage';
import BankAccountPage from '@/pages/bank/BankAccountPage';
import BankTransferPage from '@/pages/bank/BankTransferPage';
import BankAtmPage from '@/pages/bank/BankAtmPage';

export default function Bank() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BankHomePage />} />
        <Route path="account" element={<BankAccountPage />} />
        <Route path="transfer" element={<BankTransferPage />} />
        <Route path="atm" element={<BankAtmPage />} />
      </Routes>
    </>
  );
}
