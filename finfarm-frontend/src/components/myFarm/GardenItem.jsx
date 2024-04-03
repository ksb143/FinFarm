import 새싹 from '@/assets/images/sprout.png';
import 구덩이 from '@/assets/images/hole.png';
import React from 'react';
import useCropStore from '@/store/cropStore';

function GardenItem({ index, status, name, image }) {
  const crops = useCropStore((state) => state.crop);
  const cropImage = crops.find((crop) => crop.name === name)?.image;

  return (
    <div
      style={{
        width: '100%',
        height: '100px',
        border: '3px solid #431407',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {image ? (
        <img
          src={cropImage}
          alt={name}
          style={{
            maxWidth: '60%',
            maxHeight: '60%',
            backgroundColor: 'white',
            borderRadius: '50px',
          }}
        />
      ) : (
        <img src={구덩이} alt={구덩이} />
      )}
      <p className=" text-2xl text-lime-100">{name}</p>
    </div>
  );
}

export default GardenItem;
