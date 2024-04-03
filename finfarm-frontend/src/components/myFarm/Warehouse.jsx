import React, { useEffect, useState } from 'react';
import useUserStore from '@/store/userStore';
import WareHouseItem from '@/components/myFarm/WarehouseItem';

export default function WareHouse({ memberItems }) {
  const [wareHouseSpace, setWareHouseSpace] = useState(
    Array.from({ length: 20 }, (_, index) => null),
  );

  // 전역상태관리 import 로직
  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));

  useEffect(() => {
    const wareHouseSpace = Array.from({ length: 20 }, (_, index) =>
      memberItems[index] ? memberItems[index] : null,
    );
    setWareHouseSpace(wareHouseSpace);
  }, [memberItems]);

  return (
    <div className="w-full">
      <h1 className="rounded-t-xl border-8 border-gray-600 bg-gradient-to-r from-gray-300 via-gray-400 text-center text-2xl shadow-xl">
        {nickname} 님의 창고
      </h1>
      <div className="flex flex-wrap rounded-b-xl border-8 border-gray-600 bg-gray-600">
        {wareHouseSpace.map((item, idx) => (
          <WareHouseItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
