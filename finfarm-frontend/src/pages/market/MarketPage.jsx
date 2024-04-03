import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './MarketPage.css';

import { getMarketInfo } from '@/api/market';

import CropPriceInfo from '@/components/market/CropPriceInfo';
import useCropInfoStore from '@/store/cropInfoStore';
import useCropPriceHistoryStore from '@/store/cropPriceHistoryStore';
import useItemStore from '@/store/itemStore';
import WareHouse from '@/components/myFarm/Warehouse';

export default function MarketPage() {
  const navigate = useNavigate();
  const { cropList, setCropList } = useCropInfoStore((state) => ({
    cropList: state.cropList,
    setCropList: state.setCropList,
  }));

  const { setCropPriceHistory } = useCropPriceHistoryStore((state) => ({
    setCropPriceHistory: state.setCropPriceHistory,
  }));

  const { items, setItems } = useItemStore((state) => ({
    items: state.items,
    setItems: state.setItems,
  }));

  // 아이템 포매팅
  const formatMemberItems = (tempMemberItems) => [
    ...tempMemberItems.seeds.map((seed) => ({
      name: seed.seedName,
      period: seed.seedPeriod,
      content: seed.seedContent,
      amount: seed.seedAmount,
    })),
    ...tempMemberItems.agricultures.map((agriculture) => ({
      name: agriculture.agricultureName,
      unit: agriculture.agricultureUnit,
      content: agriculture.agricultureContent,
      amount: agriculture.agricultureAmount,
    })),
  ];

  useEffect(() => {
    const fetchMarketInfo = async () => {
      const response = await getMarketInfo();

      // 작물 시세 관련
      const tempCrops = response.agricultureDTO;
      setCropList(tempCrops);
      const formatItemData = tempCrops.map((crop) => ({
        id: crop.agricultureName,
        color: 'hsl(118, 70%, 50%)',
        data: crop.agriculturePriceHistoryDTO.map((priceHistory) => ({
          x: priceHistory.date,
          y: priceHistory.agriculturePrice,
          color: 'hsl(299, 70%, 50%)',
        })),
      }));
      setCropPriceHistory(formatItemData);

      // 개인 창고
      const tempMemberItems = formatMemberItems(response.memberItemsDTO);
      setItems(tempMemberItems);
    };

    fetchMarketInfo();
  }, []);

  return (
    <div className="flex w-full justify-between gap-3">
      <div className="w-1/2">
        <h2 className="text-2xl">작물 시세</h2>
        <p className="mb-5 ">클릭하면 상세 작물 시세를 알 수 있습니다!</p>
        <div className="custom-scrollbar h-screen overflow-y-scroll">
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
      <div className="mt-10 w-1/2">
        <WareHouse memberItems={items} />
      </div>
    </div>
  );
}
