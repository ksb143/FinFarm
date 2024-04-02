import React, { useEffect } from 'react';
import useUserStore from '@/store/userStore';
import WareHouseItem from '@/components/myFarm/WarehouseItem';

export default function WareHouse(memberItems) {
  // 전역상태관리 import 로직
  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));

  const wareHouseSpace = Array.from({ length: 25 }, (_, index) =>
    memberItems[index] ? memberItems[index] : null,
  );

  return (
    <div>
      <h1 className="border-8 border-amber-700 bg-amber-100 text-center text-2xl">
        {nickname} 님의 창고
      </h1>
      <div className="flex flex-wrap border-8 border-amber-700">
        {wareHouseSpace.map((item, idx) => (
          <WareHouseItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
