import React from 'react';
// import coming_soon from '@/assets/images/coming_soon.png';
import Inventory_test from '@/components/myFarm/Inventory_test';

export default function MyFarmPage() {
  return (
    <div>
      <h1 className="text-center text-3xl">내 농장</h1>
      <br />
      <br />
      <Inventory_test />
    </div>
  );
}
