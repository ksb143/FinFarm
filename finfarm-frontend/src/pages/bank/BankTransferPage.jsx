import { useState, useEffect } from 'react';

import BankBasicinfo from '@/components/bank/BankBasicInfo';
import TransferDetail from '@/components/bank/BankTransfer/TransferDetail';
import TransferCheck from '@/components/bank/BankTransfer/TransferCheck';
import danger from '@/assets/images/danger.png';

import { recentTransferDetails } from '@/api/bank';

export default function BankTransferPage() {
  const [transferResult, setTransferResult] = useState(null);
  const [transferInfo, setTransferInfo] = useState(false);
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  // 이체 여부 확인 함수
  const handleTransferResult = (response) => {
    setRecentTransfers(response);
  };

  // 이체 실행 버튼 함수
  const handleTransferInfo = () => {
    setTransferInfo(true);
  };

  // 최근 이체 내역 업데이트 함수
  const fetchRecentTransfers = async () => {
    try {
      const recentTransferData = await recentTransferDetails();
      setTransferResult(recentTransferData);
    } catch (error) {
      console.error(error);
    }
  };

  // 선택 금액 입력 필드에 설정
  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  // 최근 이체 내역 설정
  useEffect(() => {
    fetchRecentTransfers();
  }, []);

  return (
    <div className="flex gap-3">
      <div className="flex w-8/12 flex-col gap-3">
        <div className="flex flex-col gap-10 rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-5">
          <BankBasicinfo isButton={false} />
          <label
            htmlFor="accountPassword"
            className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300 bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="accountPassword"
              type="password"
              className="grow"
              placeholder="계좌 비밀번호 4자리"
              maxLength={4}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^\d*$/;
                if (!regex.test(value)) {
                  // 입력된 키가 숫자가 아닌 경우
                  e.target.value = ''; // 입력 방지
                }
              }}
            />
          </label>
        </div>
        <div className="flex flex-col gap-5 rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-5">
          <h3 className="text-xl">입금 정보</h3>
          <div className="flex flex-col gap-7 rounded-xl border-2 border-solid border-gray-300 bg-gray-50 p-5">
            <div className="flex w-full justify-between">
              <span
                onClick={() => handleAmountSelect(10000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                1만원
              </span>
              <span
                onClick={() => handleAmountSelect(50000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                5만원
              </span>
              <span
                onClick={() => handleAmountSelect(100000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                10만원
              </span>
              <span className="w-1/6 border-r-2 border-solid border-gray-300 text-center">
                50만원
              </span>
              <span className="w-1/6 border-r-2 border-solid border-gray-300 text-center">
                100만원
              </span>
              <span className="w-1/6 text-center">전액</span>
            </div>
            <label className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300">
              <input
                value={amount}
                type="text"
                className="grow"
                placeholder="입금금액"
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^\d*$/;
                  if (!regex.test(value)) {
                    // 입력된 키가 숫자가 아닌 경우
                    e.target.value = ''; // 입력 방지
                  }
                }}
              />
              <span>원</span>
            </label>
          </div>
          <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab [--tab-bg:#f9fafb] [--tab-border-color:#d1d5db]"
              aria-label="최근 기록"
              checked
            />
            <div
              role="tabpanel"
              className="tab-content rounded-box border-r-2 border-solid border-gray-300 bg-gray-50 p-6"
            >
              <div className="grid grid-cols-3 gap-3">
                {recentTransfers.map((recentTransfer, idx) => (
                  <TransferDetail
                    key={idx}
                    recentTransfers={recentTransfer.nickname}
                    profileImg={recentTransfer.requestTime}
                    transferDate={recentTransfer.imgeUrl}
                  />
                ))}
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab [--tab-bg:#f9fafb] [--tab-border-color:#d1d5db]"
              aria-label="직접 입력"
            />
            <div
              role="tabpanel"
              className="tab-content rounded-box border-r-2 border-solid border-gray-300 bg-gray-50 p-6"
            >
              <label className="input input-bordered flex items-center gap-2 pr-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="송금하실 분의 닉네임"
                />
                <button className="h-full rounded-r-lg border-2 bg-gray-300 bg-lime-500 px-7 text-white">
                  조회
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-4/12 flex-col gap-3">
        <div className="flex items-center rounded-lg bg-rose-300 p-5">
          <img className="mr-5" src={danger} alt="danger" />
          <div>
            <p className="text-xl text-red-600">주의하세요!</p>
            <p className="whitespace-normal break-keep">
              지인이나 검찰, 경찰, 금융감독원 등 국가기관을 사칭하여 이체 요구시
              반드시 사실관계를 확인하세요.
            </p>
          </div>
        </div>
        <button
          onClick={handleTransferInfo}
          className="rounded-lg bg-lime-500 py-5 font-hopang text-2xl text-white"
        >
          이체실행
        </button>
        {transferInfo && (
          <TransferCheck
            password={3241}
            recipient="러브다이브"
            sender="숨참고"
            amount={30000}
            balance={30000}
            onTransferResult={handleTransferResult}
          ></TransferCheck>
        )}
      </div>
    </div>
  );
}
