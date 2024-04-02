import { useState } from 'react';
import './WarehouseItem.css';

export default function WareHouseItem({ item }) {
  const [count, setCount] = useState(0);
  const [isTooltip, setIsToolTip] = useState(false);

  return (
    <div className="h-40 w-1/5 border-4 border-amber-700 bg-amber-100">
      {item ? (
        <div
          className="relative h-full"
          onMouseEnter={() => setIsToolTip(true)}
          onMouseLeave={() => setIsToolTip(false)}
        >
          <div className="absolute left-1 top-1 rounded-full bg-white p-2">
            {item.amount}개
          </div>
          <div className="h-4/5 bg-amber-100">해당 작물 이미지</div>
          <div className="flex h-1/5 items-center border-t-8 border-amber-700 bg-amber-100">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="w-14 border-amber-700 bg-lime-500 text-center text-white hover:bg-lime-950"
            >
              +
            </button>
            <div className="flex-grow">
              <div>
                <input
                  className="h-full w-full bg-amber-100 pl-1 text-center focus:outline-none"
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)} // 입력값으로 상태 업데이트
                />
              </div>
            </div>
            <button
              onClick={() => setCount((prev) => Math.max(0, prev - 1))}
              className="w-14 border-amber-700 bg-lime-500 text-center text-white hover:bg-lime-950"
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
          <div className="h-4/5 bg-amber-100"></div>
          <div className="flex h-1/5 items-center border-t-8 border-amber-700 bg-amber-100">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="w-14 border-amber-700 bg-lime-500 text-center text-white hover:bg-lime-950"
            >
              +
            </button>
            <div className="flex-grow">
              <div>
                <input
                  className="h-full w-full bg-amber-100 pl-1 text-center focus:outline-none"
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)} // 입력값으로 상태 업데이트
                />
              </div>
            </div>
            <button
              onClick={() => setCount((prev) => Math.max(0, prev - 1))}
              className="w-14 border-amber-700 bg-lime-500 text-center text-white hover:bg-lime-950"
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
