import React from 'react';
import useUserStore from '@/store/userStore';

const InventoryItem = () => (
  <div className="h-30 w-30 static bg-amber-100">
    <div className="h- mx-auto mb-1 mt-1 w-20 bg-amber-200">
      Lorem ipsum dolor sit amet Lorem ipsum dolor
    </div>
    <div className="flex flex-row justify-between border-emerald-400 bg-white">
      <div className="w-5 border-2">+</div>
      <div className="flex-grow border-2 border-emerald-400 bg-white">0 개</div>
      <div className="w-5 border-2">-</div>
    </div>
  </div>
);

const InventoryWarehouse = () => {
  // 전역상태관리 import 로직
  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));
  return (
    <>
      <div
        className="relative flex flex-col"
        style={{ width: '400px', height: 'auto' }}
      >
        <div className="mb-3 bg-amber-200 text-center">
          <h1 className="border-2 border-amber-700 text-2xl ">
            {nickname} 님의 창고
          </h1>
        </div>
        <div className="overflow-auto border-2 border-amber-400 bg-amber-400 px-3 py-3">
          <div className="grid grid-cols-5 gap-1 bg-amber-700 px-3 py-3 text-center">
            {[...Array(20)].map((_, index) => (
              <InventoryItem key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryWarehouse;
