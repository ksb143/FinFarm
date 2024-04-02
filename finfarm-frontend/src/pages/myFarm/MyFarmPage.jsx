import React from 'react';
// import coming_soon from '@/assets/images/coming_soon.png';
import InventoryWarehouse from '@/components/myFarm/InventoryWarehouse';
import GardenField from '@/components/myFarm/GardenField';

export default function MyFarmPage() {
  return (
    <div>
      <h1 className="text-center text-6xl">내 농장</h1>
      <br />
      <br />
      <div className="flex justify-between">
        <GardenField />
        <InventoryWarehouse />
      </div>
    </div>
  );
}
