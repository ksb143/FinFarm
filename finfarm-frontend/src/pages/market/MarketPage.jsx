import { useState } from 'react';

import potato from '@/assets/images/potato.png';
import CropPriceInfo from '@/components/market/CropPriceInfo';

const cropInfo = [
  {
    agricultureName: '감자',
    agricultureImg: potato,
    agricultureContent: '맛있어요',
    fluctuationPriceL: 30000,
    fluctuationRate: 2.456677,
  },
  {
    agricultureName: '감자',
    agricultureImg: potato,
    agricultureContent: '맛있어요',
    fluctuationPriceL: 30000,
    fluctuationRate: 2.456677,
  },
  {
    agricultureName: '감자',
    agricultureImg: potato,
    agricultureContent: '맛있어요',
    fluctuationPriceL: 30000,
    fluctuationRate: 2.456677,
  },
  {
    agricultureName: '감자',
    agricultureImg: potato,
    agricultureContent: '맛있어요',
    fluctuationPriceL: 30000,
    fluctuationRate: 2.456677,
  },
];

export default function MarketPage() {
  return (
    <div className="w-full">
      <div className="w-1/2">
        {cropInfo.map((crop, idx) => (
          <CropPriceInfo
            key={idx}
            agricultureName={crop.agricultureName}
            agricultureImg={crop.agricultureImg}
            agricultureContent={crop.agricultureContent}
            fluctuationPriceL={crop.fluctuationPriceL}
            fluctuationRate={crop.fluctuationRate}
          />
        ))}
      </div>
    </div>
  );
}
