import React, { useState, useEffect } from 'react';
import WareHouse from '@/components/myFarm/Warehouse';
import GardenField from '@/components/myFarm/GardenField';
import ButtonFarmLevel from '@/components/myFarm/ButtonFarmLevel';
import { CheckMyfarmInfo, DumpTrashes } from '@/api/myfarm';

import useItemStore from '@/store/itemStore';
import useFieldStore from '@/store/fieldStore';

export default function MyFarmPage() {
  const [farmerInfo, setFarmerInfo] = useState(null);

  const { items, setItems } = useItemStore((state) => ({
    items: state.items,
    setItems: state.setItems,
  }));

  const { farmField, setFarmField } = useFieldStore((state) => ({
    farmField: state.farmField,
    setFarmField: state.setFarmField,
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
        setFarmerInfo(tempFarmInfo);

        // 창고 저장 코드
        const tempMemberItems = formatMemberItems(tempFarmInfo.memberItems);
        setItems(tempMemberItems);

        // 농장 필드 저장 코드
        setFarmField(tempFarmInfo.farmFieldInfo);

        setFetchingInfo(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFarmerInfo();
  }, [items, farmField]); // 의존성 배열을 fetchingInfo로 변경

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 justify-between">
        <div>
          {farmerInfo && (
            <p className="mb-5 text-xl">{`${farmerInfo.nickname} 농장의 지력은 ${farmerInfo.farmLevel}레벨`}</p>
          )}
          <GardenField farmerInfo={farmerInfo} farmField={farmField} />
          <ButtonFarmLevel />
        </div>
      </div>
      <div className="w-1/2">
        <WareHouse memberItems={items} />
      </div>
    </div>
  );
}
