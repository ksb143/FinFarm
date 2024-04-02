import React from 'react';
import 새싹 from '@/assets/images/sprout.png';
import useFarmStore from '@/store/farmStore';
import useCropStore from '@/store/cropStore'; // useCropStore import 추가

const GardenField = ({ farmerInfo }) => {
  // 전역상태관리 import 로직
  const { farmFieldInfo } = useFarmStore((state) => ({
    farmFieldInfo: state.farmFieldInfo,
  }));

  const { crop } = useCropStore(); // useCropStore로부터 crop 상태를 가져옴

  const getImageByAgricultureName = (agricultureName) => {
    const cropInfo = crop.find((cropItem) => cropItem.name === agricultureName);
    return cropInfo ? cropInfo.image : null;
  };

  const GardenItem = farmFieldInfo.map((field, index) => (
    <div key={index} className="h-30 w-30 static rounded-3xl bg-orange-950">
      <div className="flex flex-row justify-center">
        <img
          src={getImageByAgricultureName(field.agricultureName)}
          alt="작물"
        />
      </div>
    </div>
  ));

  return (
    <>
      {farmerInfo && (
        <div
          className="relative flex flex-col"
          style={{ width: '400px', height: 'auto' }}
        >
          <div className="mb-3 text-center">
            <h1 className="border-2 text-2xl ">
              {farmerInfo.nickname} 님의 농장
            </h1>
          </div>

          <div className="overflow-auto border-2 bg-red-950 px-3 py-3 ">
            <div className="grid grid-cols-5 justify-items-center gap-2 rounded-2xl bg-amber-900 px-1 py-1 text-center">
              {GardenItem}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GardenField;
