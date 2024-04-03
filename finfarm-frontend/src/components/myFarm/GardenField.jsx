import React from 'react';
import GardenItem from './GardenItem';

function GardenField({ farmerInfo }) {
  console.log('farmerInfo:', farmerInfo);
  console.log('farmFieldInfo:', farmerInfo?.farmFieldInfo);
  // 각 GardenItem에 대한 정보를 동적으로 생성
  const items = Array.from({ length: 25 }, (_, index) => {
    // farmFieldInfo에서 해당 인덱스와 일치하는 필드 정보 찾기
    const fieldInfo = farmerInfo?.farmFieldInfo?.find(
      (field) => field.index === index + 1,
    );

    // fieldInfo가 있으면 해당 정보 사용, 없으면 기본값 사용
    return {
      index,
      status: fieldInfo ? 'planted' : 'empty',
      name: fieldInfo?.agricultureName || '',
      image: fieldInfo ? 'pathtoimage' : '',
    };
  });
  console.log('items:', items);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '2px',
        width: '500px',
      }}
      className="justify-items-center gap-1 rounded-2xl bg-amber-900 px-1 py-1 text-center"
    >
      {items.map((item) => (
        <GardenItem
          key={item.index}
          index={item.index}
          status={item.status}
          name={item.name}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default GardenField;
