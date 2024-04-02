import React, { useState, useEffect } from 'react';
import WareHouse from '@/components/myFarm/Warehouse';
import GardenField from '@/components/myFarm/GardenField';
import ButtonFarmLevel from '@/components/myFarm/ButtonFarmLevel';
import {
  CheckMyfarmInfo,
  PlantSeeds,
  HarvestPlants,
  DumpTrashes,
} from '@/api/myfarm';

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

  useEffect(() => {
    const fetchFarmerInfo = async () => {
      try {
        // 기본 코드
        const tempFarmInfo = await CheckMyfarmInfo();
        setFarmerInfo(tempFarmInfo);
        // 창고 저장 코드
        const tempMemberItems = formatMemberItems(tempFarmInfo.memberItems);
        setItems(tempMemberItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFarmerInfo();
  }, [items]);

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 justify-between">
        <div>
          <GardenField />
          <ButtonFarmLevel />
        </div>
      </div>
      <div className="w-1/2">
        <WareHouse memberItems={items} />
      </div>
    </div>
  );
}
