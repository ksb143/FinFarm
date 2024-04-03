import React, { useEffect, useState } from 'react';
import useCropStore from '@/store/cropStore';
// 이미지 경로가 정확하게 설정되었는지 확인하세요.
import sprout from '@/assets/images/sprout.png';
import hole from '@/assets/images/hole.png';
import Modal from '../layout/Modal';
import useItemStore from '@/store/itemStore';
import useFieldStore from '@/store/fieldStore';
import { HarvestPlants, PlantSeeds } from '@/api/myfarm';

function GardenItem({ index, item }) {
  const [status, setStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImgSrc] = useState(hole);
  const crops = useCropStore((state) => state.crop);
  const { setItems } = useItemStore((state) => ({
    setItems: state.setItems,
  }));
  const [formattedDateTime, setFormattedDateTime] = useState(null);

  const { setFarmField } = useFieldStore((state) => ({
    setFarmField: state.setFarmField,
  }));

  useEffect(() => {
    // item이 없는 경우, 즉 null일 때는 이미지를 구덩이(hole)로 설정하고 로직 종료
    if (!item) {
      setImgSrc(hole);
      return; // useEffect의 나머지 부분을 실행하지 않음
    }
    setFormattedDateTime(formatDateTime(item.harvestTime));
    const checkTime = () => {
      const now = new Date(); // 현재 시간
      const targetDate = new Date(item.harvestTime); // 비교 대상 시간

      // targetDate가 현재 시간보다 이전인 경우, setStatus를 true로 설정
      if (targetDate < now) {
        setStatus(true);
        const cropImage = crops.find(
          (crop) => crop.name === item.agricultureName,
        )?.image;
        setImgSrc(cropImage || sprout); // 작물 이미지가 없으면 새싹 이미지를 사용
      } else {
        // 수확 시간 전이면 새싹 이미지를 사용
        setImgSrc(sprout);
      }
    };

    // item이 존재하고, 처음부터 targetDate가 현재 시간보다 이전인지 바로 체크
    checkTime();

    // 5분(300,000밀리초)마다 checkTime 함수를 호출
    const intervalId = setInterval(checkTime, 300000); // 300,000밀리초 = 5분

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId);
  }, [item, crops]);

  const formatMemberItems = (tempMemberItems) => [
    ...tempMemberItems.seeds.map((seed) => ({
      name: seed.seedName,
      period: seed.seedPeriod,
      content: seed.seedContent,
      amount: seed.seedAmount,
    })),
    ...tempMemberItems.agricultures.map((agriculture) => ({
      name: agriculture.agricultureName,
      unit: agriculture.agricultureUnit,
      content: agriculture.agricultureContent,
      amount: agriculture.agricultureAmount,
    })),
  ];

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC', // Z는 UTC를 의미하므로, UTC 기준으로 변환합니다.
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
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

  // 씨앗심기 로직
  const onSeedDropped = async (seed) => {
    try {
      const tempFarmInfo = await PlantSeeds(index + 1, seed.name);
      // 창고 업데이트
      const tempMemberItems = formatMemberItems(tempFarmInfo.memberItems);
      setItems(tempMemberItems);
      // 농장 업데이트
      setFarmField(tempFarmInfo.farmFieldInfo);
      alert('씨앗 심기 성공');
    } catch (error) {
      console.log('씨앗심기 실패');
      console.error(error);
    }
  };

  // 수확 로직
  const handleHarvesting = async () => {
    try {
      // API 호출과 응답 처리
      const tempFarmInfo = await HarvestPlants(index + 1);
      // 창고 업데이트
      const tempMemberItems = formatMemberItems(tempFarmInfo.memberItems);
      setItems(tempMemberItems);
      // 농장 업데이트
      setFarmField(tempFarmInfo.farmFieldInfo);
      alert('수확에 성공했습니다');
    } catch (error) {
      console.error('수확 실패:', error);
      alert('수확에 실패했습니다');
    }
    setShowModal(false);
  };

  return (
    <div className="group relative">
      <div className="chat chat-end">
        {item && (
          <div className="chat-bubble absolute -left-16 -top-14 whitespace-normal break-keep bg-lime-500 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {formattedDateTime}에 수확 가능
          </div>
        )}
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => {
          if (status) {
            setShowModal(true);
          }
        }}
        style={{
          width: '100%',
          height: '100px',
          border: '3px solid #431407',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          cursor: status ? 'pointer' : 'default',
        }}
      >
        <img
          src={imageSrc}
          alt="땅"
          style={{
            maxWidth: '95%',
            maxHeight: '95%',
            borderRadius: '40px',
          }}
        />
        {item && (
          <p className="flex text-xl text-lime-100">{item.agricultureName}</p>
        )}
        {showModal && (
          <Modal
            onCancel={() => {
              setShowModal(false);
            }}
            onConfirm={handleHarvesting}
          >
            {`${item.agricultureName} 수확하시겠습니까?`}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default GardenItem;
