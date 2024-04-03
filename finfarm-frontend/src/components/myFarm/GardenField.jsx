import 새싹 from '@/assets/images/sprout.png';
import React from 'react';
import useFarmStore from '@/store/farmStore';
import useCropStore from '@/store/cropStore';

const GardenField = ({ farmerInfo }) => {
  const { farmFieldInfo } = useFarmStore((state) => ({
    farmFieldInfo: state.farmFieldInfo,
  }));

  const { crop } = useCropStore();

  const getImageByAgricultureName = (agricultureName) => {
    const cropInfo = crop.find((cropItem) => cropItem.name === agricultureName);
    return cropInfo ? cropInfo.image : 새싹;
  };

  let gardenItems = Array.from({ length: 25 }, () => 새싹); // 총 25개의 필드를 가정

  farmerInfo?.farmFieldInfo.forEach((field) => {
    if (field.index - 1 < gardenItems.length) {
      gardenItems[field.index - 1] = getImageByAgricultureName(
        field.agricultureName,
      );
    }
  });

  const GardenItem = gardenItems.map((imageSrc, index) => (
    <div key={index} className="h-30 w-30 static rounded-3xl bg-orange-700">
      <div className="flex flex-row justify-center">
        <img src={imageSrc} alt="작물" />
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
