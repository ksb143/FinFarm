import { Link, useParams } from 'react-router-dom';

import CropPriceChart from '@/components/market/CropPriceChart';
import useCropInfoStore from '@/store/cropInfoStore';
import useCropPriceHistoryStore from '@/store/cropPriceHistoryStore';
import { useEffect, useState } from 'react';

export default function MarketDetailPage() {
  const { cropName } = useParams();
  const [specificCropPriceHistory, setSpecificCropPriceHistory] =
    useState(null);

  const cropPriceHistoryList = useCropPriceHistoryStore(
    (state) => state.cropPriceHistoryList,
  );
  const { cropList } = useCropInfoStore((state) => ({
    cropList: state.cropList,
  }));

  useEffect(() => {
    // cropPriceHistoryList에서 cropName에 해당하는 항목을 찾아 상태 업데이트
    const history = cropPriceHistoryList.find(
      (agriculture) => agriculture.id === cropName,
    );
    setSpecificCropPriceHistory(history);
  }, [cropName, cropPriceHistoryList]);

  return (
    <div className="h-full w-full">
      <div className="w-1/2">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            농작물 시세 살펴보기
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {cropList.map((crop, idx) => (
              <li key={idx}>
                <Link to={`market/${crop.agricultureName}`}>
                  {crop.agricultureName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-96">
          {specificCropPriceHistory && (
            <CropPriceChart data={[specificCropPriceHistory]}></CropPriceChart>
          )}
        </div>
      </div>
    </div>
  );
}
