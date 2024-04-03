import React, { useState, useEffect } from 'react';
import WareHouse from '@/components/myFarm/Warehouse';
import GardenField from '@/components/myFarm/GardenField';
import ButtonFarmLevel from '@/components/myFarm/ButtonFarmLevel';
import { CheckMyfarmInfo, DumpTrashes } from '@/api/myfarm';

import useItemStore from '@/store/itemStore';

export default function MyFarmPage() {
  const [farmerInfo, setFarmerInfo] = useState(null);
  const { items, setItems } = useItemStore((state) => ({
    items: state.items,
    setItems: state.setItems,
  }));

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
  const [fetchingInfo, setFetchingInfo] = useState(true);

  useEffect(() => {
    const fetchFarmerInfo = async () => {
      try {
        if (!fetchingInfo) return;
        // 기본 코드
        const tempFarmInfo = await CheckMyfarmInfo();
        console.log('Farmer Info:', tempFarmInfo); // 결과값 콘솔에 출력
        setFarmerInfo(tempFarmInfo);

        // 창고 저장 코드
        const tempMemberItems = formatMemberItems(tempFarmInfo.memberItems);
        console.log('Farmer 아이템 Info:', tempMemberItems); // 결과값 콘솔에 출력ch
        setItems(tempMemberItems);

        setFetchingInfo(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFarmerInfo();
  }, [items]); // 의존성 배열을 fetchingInfo로 변경

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 justify-between">
        <div>
          <GardenField farmerInfo={farmerInfo} />
          <br />
          <br />
          <ButtonFarmLevel />
        </div>
      </div>
      <div className="w-1/2">
        <WareHouse memberItems={items} />
      </div>
    </div>
  );
}
