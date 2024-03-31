import { useEffect, useState } from 'react';

import { getMarketInfo } from '@/api/market';

import potato from '@/assets/images/potato.png';
import CropPriceInfo from '@/components/market/CropPriceInfo';
import WareHouseList from '@/components/layout/WareHouseList';

export default function MarketPage() {
  return (
    <div className="w-full">
      <div className="w-1/2">
        <h2 className="mb-5 text-2xl">시세 높은 순</h2>
        {cropInfo.map((crop, idx) => (
          <CropPriceInfo
            key={idx}
            agricultureName={crop.agricultureName}
            agricultureImg={crop.agricultureImg}
            agricultureContent={crop.agricultureContent}
            fluctuationPrice={crop.fluctuationPrice}
            fluctuationRate={crop.fluctuationRate}
          />
        ))}
      </div>
    </div>
  );
}
