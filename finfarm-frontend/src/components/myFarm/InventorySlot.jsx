import React from 'react';
import './InventorySlot.module.css';

const InventorySlot = ({ item, ...props }) => {
  // 여기서 item 객체는 seed 또는 agriculture 객체입니다.

  return (
    <div
      className={`inventory-slot ${item.occupied ? 'occupied' : ''}`}
      onClick={() => props.toggleOccupied(item)}
    >
      <div className="item-name">{item.seedName || item.agricultureName}</div>
      <div className="item-amount">
        {item.seedAmount || item.agricultureAmount}
      </div>
      {/* 기타 정보 표시 */}
    </div>
  );
};

export default InventorySlot;
