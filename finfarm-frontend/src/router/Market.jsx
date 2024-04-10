import { Routes, Route } from 'react-router-dom';
import MarketPage from '@/pages/market/MarketPage';
import MarketDetailPage from '@/pages/market/MarketDetailPage';

export default function Market() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MarketPage />} />
        <Route path="/:cropName" element={<MarketDetailPage />} />
      </Routes>
    </>
  );
}
