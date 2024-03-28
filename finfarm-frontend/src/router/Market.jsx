import { Routes, Route } from 'react-router-dom';
import MarketPage from '@/pages/market/MarketPage';

export default function Market() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MarketPage />} />
      </Routes>
    </>
  );
}
