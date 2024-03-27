import { Routes, Route } from 'react-router-dom';
import BankHomePage from '@/pages/bank/BankHomePage';
import BankAccountPage from '@/pages/bank/BankAccountPage';
import BankTransferPage from '@/pages/bank/BankTransferPage';
import BankAtmPage from '@/pages/bank/BankAtmPage';
import BankLoanHistoryPage from '@/pages/bank/BankLoanHistoryPage';
import BankLoanItemPage from '@/pages/bank/BankLoanItemPage';

export default function Bank() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BankHomePage />} />
        <Route path="account" element={<BankAccountPage />} />
        <Route path="transfer" element={<BankTransferPage />} />
        <Route path="atm" element={<BankAtmPage />} />
        <Route path="loan/history" element={<BankLoanHistoryPage />} />
        <Route path="loan/item" element={<BankLoanItemPage />} />
      </Routes>
    </>
  );
}
