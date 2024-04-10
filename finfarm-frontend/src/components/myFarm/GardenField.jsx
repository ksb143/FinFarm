import React from 'react';
import GardenItem from './GardenItem';

function GardenField({ farmerInfo, farmField }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '2px',
        width: '500px',
      }}
      className="justify-items-center gap-1 rounded-xl bg-amber-900 px-1 py-1 text-center"
    >
      {farmField.map((item, index) => (
        <GardenItem key={index} index={index} item={item} />
      ))}
    </div>
  );
}

export default GardenField;
