import React, { useState, useEffect } from 'react';
import InventoryWarehouse from '@/components/myFarm/InventoryWarehouse';
import GardenField from '@/components/myFarm/GardenField';
import ButtonFarmLevel from '@/components/myFarm/ButtonFarmLevel';
import {
  CheckMyfarmInfo,
  PlantSeeds,
  HarvestPlants,
  DumpTrashes,
} from '@/api/myfarm';

export default function MyFarmPage() {
  const [farmerInfo, setfarmerInfo] = useState(null);
  useEffect(() => {
    CheckMyfarmInfo()
      .then((data) => setfarmerInfo(data))
      .catch((error) => console.log('Error fetching farmer info:', error));
  });
  return (
    <div>
      <h1 className="text-center text-5xl">내 농장</h1>
      <br />
      <br />
      <div className="flex justify-between">
        <div>
          <GardenField />
          <br />
          <br />
          <ButtonFarmLevel />
        </div>

        <InventoryWarehouse />
      </div>
    </div>
  );
}
