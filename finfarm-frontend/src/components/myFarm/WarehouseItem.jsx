import { useState } from 'react';
import './WarehouseItem.css';

export default function WareHouseItem({ item }) {
  const [count, setCount] = useState(0);
  const [isTooltip, setIsToolTip] = useState(false);

  return (
    <div className="h-40 w-1/5 border-4 border-gray-600 bg-gradient-to-b from-gray-400 to-gray-500">
      {item ? (
        <div
          className="relative h-full"
          onMouseEnter={() => setIsToolTip(true)}
          onMouseLeave={() => setIsToolTip(false)}
        >
          <div className="absolute left-1 top-1 rounded-full bg-white p-2">
            {item.amount}개
          </div>
          <div className="h-4/5 bg-gradient-to-b from-gray-300 to-gray-500">
            해당 작물 이미지
          </div>
          <div className="flex h-1/5 items-center border-t-8 border-gray-600 bg-gradient-to-r from-gray-400 to-gray-500">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="w-14 border-gray-600 bg-lime-500 text-center text-white hover:bg-lime-950"
            >
              +
            </button>
            <div className="flex-grow">
              <div>
                <input
                  className="h-full w-full bg-gradient-to-r from-gray-400 to-gray-500 pl-1 text-center focus:outline-none"
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)} // 입력값으로 상태 업데이트
                />
              </div>
            </div>
            <button
              onClick={() => setCount((prev) => Math.max(0, prev - 1))}
              className="w-14 border-gray-600 bg-lime-500 text-center text-white hover:bg-lime-950"
            >
              -
            </button>
            <button className="bg-white text-center">🗑</button>
          </div>
          {isTooltip && (
            <div className="absolute -right-24 -top-12 z-10 max-w-40 transform rounded bg-lime-500 px-4 py-2 text-xs text-white">
              <p>이름: {item.name}</p>
              {item.unit && <p>단위: {item.unit}</p>}
              {item.period && <p>생육기간: {item.period}</p>}
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-full">
          <div className="absolute left-1 top-1 rounded-full bg-white p-2">
            0개
          </div>
          <div className="h-4/5 bg-gradient-to-b from-gray-300 to-gray-500"></div>
          <div className="flex h-1/5 items-center border-t-8 border-gray-600 bg-gradient-to-r from-gray-300 to-gray-400">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="w-14 border-gray-600 bg-lime-500 text-center text-white hover:bg-lime-950"
            >
              +
            </button>
            <div className="flex-grow">
              <div>
                <input
                  className="h-full w-full bg-gradient-to-r from-gray-300 to-gray-400 pl-1 text-center focus:outline-none"
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)} // 입력값으로 상태 업데이트
                  disabled
                />
              </div>
            </div>
            <button
              onClick={() => setCount((prev) => Math.max(0, prev - 1))}
              className="w-14 border-gray-600 bg-lime-500 text-center text-white hover:bg-lime-950"
            >
              -
            </button>
            <button className="bg-white text-center">🗑</button>
          </div>
        </div>
      )}
    </div>
  );
}
