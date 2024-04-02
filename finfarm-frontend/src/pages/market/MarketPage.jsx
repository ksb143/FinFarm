import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMarketInfo } from '@/api/market';

import CropPriceInfo from '@/components/market/CropPriceInfo';
import useCropInfoStore from '@/store/cropInfoStore';
import useCropPriceHistoryStore from '@/store/cropPriceHistoryStore';

export default function MarketPage() {
  const { cropList, setCropList } = useCropInfoStore((state) => ({
    cropList: state.cropList,
    setCropList: state.setCropList,
  }));

  const { setCropPriceHistory } = useCropPriceHistoryStore((state) => ({
    setCropPriceHistory: state.setCropPriceHistory,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketInfo = async () => {
      const response = await getMarketInfo();
      setCropList(response.agricultureDTO);

      const transformedData = response.agricultureDTO.map((agriculture) => ({
        id: agriculture.agricultureName,
        color: 'hsl(118, 70%, 50%)',
        data: agriculture.agriculturePriceHistoryDTO.map((priceHistory) => ({
          x: priceHistory.date,
          y: priceHistory.agriculturePrice,
          color: 'hsl(299, 70%, 50%)',
        })),
      }));
      setCropPriceHistory(transformedData);
    };
    fetchMarketInfo();
  }, []);

  return (
    <div className="w-full">
      <div className="w-1/2">
        <h2 className="mb-5 text-2xl">작물 시세</h2>
        <div className="">
          {cropList.map((crop, idx) => (
            <CropPriceInfo
              key={idx}
              agricultureName={crop.agricultureName}
              agricultureImg={crop.agricultureImageUrl}
              agricultureContent={crop.agricultureContent}
              fluctuationPrice={
                crop.agriculturePriceHistoryDTO[
                  crop.agriculturePriceHistoryDTO.length - 1
                ].agriculturePrice
              }
              fluctuationRate={crop.fluctuationRate}
              onClickEvent={() => {
                navigate(`/market/${crop.agricultureName}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
