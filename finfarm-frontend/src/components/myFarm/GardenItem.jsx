import React, { useState } from 'react';
import useCropStore from '@/store/cropStore';
// 이미지 경로가 정확하게 설정되었는지 확인하세요.
import 새싹 from '@/assets/images/sprout.png';
import 구덩이 from '@/assets/images/hole.png';
import HarvestModal from './HarvestModal';
import { HarvestPlants } from '@/api/myfarm';

function GardenItem({ index, status, name }) {
  const [showModal, setShowModal] = useState(false);
  const crops = useCropStore((state) => state.crop);

  // 이미지 선택 로직
  let imageSrc;
  if (status === 'empty') {
    imageSrc = 구덩이;
  } else if (status === 'ready') {
    const cropImage = crops.find((crop) => crop.name === name)?.image;
    imageSrc = cropImage || 새싹;
  } else if (status === 'planted') {
    imageSrc = 새싹;
  }

  const handleItemClick = () => {
    if (status === 'ready') {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    try {
      // API 호출과 응답 처리
      const res = await HarvestPlants(index); // 가정: HarvestPlants 함수가 index를 파라미터로 받음
      console.log('수확 성공:', res);
      // 성공 응답을 처리하는 로직 (예: 상태 업데이트, 사용자에게 성공 메시지 표시 등)
    } catch (error) {
      console.error('수확 실패:', error);
      // 실패 응답을 처리하는 로직 (예: 사용자에게 오류 메시지 표시)
    }
    setShowModal(false);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // 드래그 오버 시 기본 동작을 방지 (드롭을 허용)
  };

  const onDrop = (e) => {
    e.preventDefault();
    const seedData = e.dataTransfer.getData('application/json');
    const seed = JSON.parse(seedData);
    if (seed.period) {
      onSeedDropped(seed); // 씨앗 심기 로직 처리
    }
  };

  const onSeedDropped = (seed) => {
    console.log(seed);
    console.log(index);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={handleItemClick}
      style={{
        width: '100%',
        height: '100px',
        border: '3px solid #431407',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: status === 'ready' ? 'pointer' : 'default',
      }}
    >
      <div className="">
        <img
          src={imageSrc}
          alt={name}
          style={{
            maxWidth: '95%',
            maxHeight: '95%',
            borderRadius: '40px',
          }}
        />
        <p className="flex text-xl text-lime-100">{name}</p>
        {showModal && (
          <HarvestModal onClose={handleCloseModal} onConfirm={handleConfirm} />
        )}
      </div>
    </div>
  );
}

export default GardenItem;
