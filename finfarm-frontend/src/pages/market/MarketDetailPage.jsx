import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CropPriceChart from '@/components/market/CropPriceChart';
import useCropPriceHistoryStore from '@/store/cropPriceHistoryStore';
import useCropInfoStore from '@/store/cropInfoStore';
import useUserStore from '@/store/userStore';

export default function MarketDetailPage() {
  const { cropName } = useParams(); // 작물명
  const { pointsInthePocket } = useUserStore((state) => ({
    pointsInthePocket: state.pointsInthePocket,
  })); // 유저 돈
  const cropPriceHistoryList = useCropPriceHistoryStore(
    (state) => state.cropPriceHistoryList,
  ); // 작물 시세 기록
  const cropInfoList = useCropInfoStore((state) => state.cropList);
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림상태 관리
  const [selectedTimeRange, setSelectedTimeRange] = useState(365); // 작물 조회 기간
  const [filteredCropData, setFilteredCropData] = useState({
    id: '익명의 작물',
    color: 'hsl(7, 70%, 50%)',
    data: [
      {
        x: '2024-04-01',
        y: 300,
      },
      {
        x: '2024-04-02',
        y: 1000,
      },
    ],
  }); // 기간 및 작물명 최종선택 데이터
  const [selectedCropInfo, setSelectedCropInfo] = useState({
    seedPrice: 0,
    minPriceInWeek: 0,
    maxPriceInWeek: 0,
    fluctuationPrice: 0,
    fluctuationRate: 0,
    currentAgriculturePrice: 0,
  }); // 해당 작물 판구매 관련 정보
  const [sellCount, setSellCount] = useState(); // 판매 개수
  const [buyCount, setBuyCount] = useState(); // 구매 개수

  // dropdown 관리
  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  // 특정 기간의 선택 농작물 데이터 추출
  useEffect(() => {
    const cropInfo = cropInfoList.find(
      (crop) => crop.agricultureName === cropName,
    );
    setSelectedCropInfo({
      seedPrice: cropInfo.seedPrice,
      minPriceInWeek: cropInfo.minPriceInWeek,
      maxPriceInWeek: cropInfo.maxPriceInWeek,
      unit: cropInfo.unit,
      fluctuationPrice: cropInfo.fluctuationPrice,
      fluctuationRate: cropInfo.fluctuationRate,
      currentAgriculturePrice:
        cropInfo.agriculturePriceHistoryDTO[
          cropInfo.agriculturePriceHistoryDTO.length - 1
        ].agriculturePrice,
    });
    const history = cropPriceHistoryList.find((crop) => crop.id === cropName);
    if (history) {
      setFilteredCropData({
        ...history,
        data: filterDataByTimeRange(history.data),
      });
    }
  }, [cropName, selectedTimeRange]);

  // 데이터 필터링 로직
  function filterDataByTimeRange(data) {
    const now = new Date();
    return data.filter((item) => {
      const itemDate = new Date(item.x);
      const timeDiff = selectedTimeRange;
      return (now - itemDate) / (1000 * 60 * 60 * 24) <= timeDiff;
    });
  }

  return (
    <div className="h-full w-full">
      <div className="w-1/2">
        <div className="flex justify-between">
          <div
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            className="dropdown dropdown-hover"
          >
            <div tabIndex={0} role="button" className="btn m-1">
              농작물 시세 살펴보기
            </div>
            {isOpen && (
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
              >
                {cropPriceHistoryList.map((crop, idx) => (
                  <li onClick={closeDropdown} key={idx}>
                    <Link to={`/market/${crop.id}`}>{crop.id}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="menu menu-vertical h-fit rounded-box bg-base-200 lg:menu-horizontal">
            <li>
              <a
                onClick={() => {
                  setSelectedTimeRange(7);
                }}
                className={`hover:bg-lime-300 ${selectedTimeRange === 7 ? 'bg-lime-300' : ''}`}
              >
                1W
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedTimeRange(14);
                }}
                className={`hover:bg-lime-300 ${selectedTimeRange === 14 ? 'bg-lime-300' : ''}`}
              >
                2W
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedTimeRange(30);
                }}
                className={`hover:bg-lime-300 ${selectedTimeRange === 30 ? 'bg-lime-300' : ''}`}
              >
                1M
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedTimeRange(90);
                }}
                className={`hover:bg-lime-300 ${selectedTimeRange === 90 ? 'bg-lime-300' : ''}`}
              >
                3M
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedTimeRange(365);
                }}
                className={`hover:bg-lime-300 ${selectedTimeRange === 365 ? 'bg-lime-300' : ''}`}
              >
                1Y
              </a>
            </li>
          </ul>
        </div>
        <Link to="/market">
          <div className="my-5 ml-5">{`< 🛍장터로 돌아가기`}</div>
        </Link>
        <div className="h-96">
          {filteredCropData && (
            <CropPriceChart
              range={selectedTimeRange}
              data={[filteredCropData]}
              fill="#84cc16"
            ></CropPriceChart>
          )}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-lg font-bold">
              <span className="mr-3">{cropName}</span>
              <span>
                {selectedCropInfo.currentAgriculturePrice.toLocaleString()}원
              </span>
            </div>
            <div className="mb-3 text-sm">
              <span className="mr-3">씨앗</span>
              <span>{selectedCropInfo.seedPrice.toLocaleString()}원</span>
            </div>
            <div>
              {selectedCropInfo.fluctuationPrice >= 0 ? (
                <span className="mr-3 text-red-600">
                  ▲{selectedCropInfo.fluctuationPrice.toLocaleString()}
                </span>
              ) : (
                <span className="mr-3 text-blue-600">
                  ▼{selectedCropInfo.fluctuationPrice.toLocaleString()}
                </span>
              )}
              {selectedCropInfo.fluctuationRate >= 0 ? (
                <span className="text-red-600">
                  +{selectedCropInfo.fluctuationRate.toFixed(2)}%
                </span>
              ) : (
                <span className="text-blue-600">
                  {selectedCropInfo.fluctuationRate.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end ">
            <div className="flex items-start gap-2">
              <span>1주 내 최고가</span>
              <span className="text-blue-600">
                {selectedCropInfo.maxPriceInWeek.toLocaleString()}원
              </span>
              <div>
                <label className="input input-sm input-bordered flex max-w-xs items-center gap-2">
                  <input
                    type="number"
                    className="grow"
                    placeholder={`${cropName} 씨앗의 단위는 1개`}
                    min="0"
                    value={buyCount}
                    onChange={(e) => setBuyCount(e.target.value)}
                  />
                </label>
                <p className="text-xs">
                  {`남은 돈 ${pointsInthePocket.toLocaleString()}원 중 `}
                  <span className="text-red-600">
                    {`${buyCount ? (buyCount * selectedCropInfo.seedPrice).toLocaleString() : 0}원 쓸게요`}
                  </span>
                </p>
              </div>
              <button className="btn btn-sm hover:bg-lime-500 hover:text-white">
                구매
              </button>
            </div>
            <div className="flex items-start gap-2">
              <span>1주 내 최저가</span>
              <span className="text-red-600">
                {selectedCropInfo.minPriceInWeek.toLocaleString()}원
              </span>
              <div>
                <label className="input input-sm input-bordered flex max-w-xs items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    className="grow"
                    value={sellCount}
                    placeholder={`${cropName}의 단위는 ${selectedCropInfo.unit}`}
                    onChange={(e) => setSellCount(e.target.value)}
                  />
                </label>
                <p className="text-xs">
                  {`${cropName} 팔아서 `}
                  <span className="text-blue-600">
                    {`${sellCount ? (sellCount * selectedCropInfo.currentAgriculturePrice).toLocaleString() : 0}원 벌게요`}
                  </span>
                </p>
              </div>
              <button className="btn btn-sm hover:bg-lime-500 hover:text-white">
                판매
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
