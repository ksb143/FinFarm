import React, { useState, useEffect } from 'react';
import { CheckMyfarmInfo } from '@/api/myfarm'; // 정확한 경로로 대체해주세요.
import InventorySlot from './InventorySlot';
import './Warehouse.module.css';

const Warehouse = () => {
  const [inventory, setInventory] = useState({
    seeds: [],
    agricultures: [],
  });

  useEffect(() => {
    // CheckMyfarmInfo 함수를 사용하여 데이터를 가져옵니다.
    const fetchInventory = async () => {
      try {
        const data = await CheckMyfarmInfo(); // API 호출
        if (data.memberItems) {
          setInventory(data.memberItems); // 응답 데이터로 상태 업데이트
        }
      } catch (error) {
        // 에러 핸들링
        console.error('Fetching inventory data failed:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="inventory-grid">
      {/* 씨앗 슬롯 */}
      {inventory.seeds.map((seed, index) => (
        <InventorySlot
          key={`seed-${index}`}
          item={seed}
          // ... 기타 필요한 props
        />
      ))}
      {/* 농작물 슬롯 */}
      {inventory.agricultures.map((agriculture, index) => (
        <InventorySlot
          key={`agriculture-${index}`}
          item={agriculture}
          // ... 기타 필요한 props
        />
      ))}
    </div>
  );
};

export default Warehouse;
