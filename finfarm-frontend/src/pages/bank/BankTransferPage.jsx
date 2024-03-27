import { useState, useEffect } from 'react';

import BankBasicinfo from '@/components/bank/BankBasicInfo';
import TransferDetail from '@/components/bank/BankTransfer/TransferDetail';
import TransferCheck from '@/components/bank/BankTransfer/TransferCheck';
import danger from '@/assets/images/danger.png';
import Modal from '@/components/layout/Modal';
import CheckModal from '@/components/layout/CheckModal';

import { recentTransferDetails, checkAnotherUser } from '@/api/bank';

export default function BankTransferPage() {
  const [transferInfo, setTransferInfo] = useState(false); // 이체 확인 컴포넌트 유무
  const [recentTransfers, setRecentTransfers] = useState([]); // 최근 이체 내역
  const [clickedIndex, setClickedIndex] = useState(null); // 최근 이체 내역 인덱스
  const [password, setPassword] = useState(''); // 계좌 비밀번호
  const [amount, setAmount] = useState(''); // 금액
  const [sender, setSender] = useState(''); // 송금인
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 보이기 유무
  const [isNickModalVisible, setIsNickModalVisible] = useState(false); // 닉네임 모달 보이기 유무
  const [anotherUser, setAnotherUser] = useState({
    imageUrl: '',
    nickname: '',
  }); // anotherUser 상태 추가
  const [isCheckModalVisible, setIsCheckModalVisible] = useState(false); // 닉네임 체크 모달 보이기 유무

  // 이체 여부 확인 함수
  const handleTransferResult = (response) => {
    console.log(response);
    fetchRecentTransfers();
    setTransferInfo(false);
    // 여기에 성공 실패 여부 시 모달 띄우기
  };

  // 이체 취소 함수
  const handleTransferCancel = () => {
    setTransferInfo(false);
  };

  // 이체 실행 버튼 함수
  const handleTransferInfo = () => {
    if (password && sender && amount) {
      setTransferInfo(true);
    } else {
      alert('계좌비밀번호, 입금금액, 송금자와 관련된 모든 정보를 기입해주세요');
    }
  };

  // 최근 이체 내역 업데이트 함수
  const fetchRecentTransfers = async () => {
    try {
      const recentTransferData = await recentTransferDetails();
      if (!Array.isArray(recentTransferData)) {
        console.error('recentTransferData is not an array', recentTransferData);
        setRecentTransfers([]);
      } else {
        setRecentTransfers(recentTransferData);
      }
    } catch (error) {
      console.error(error);
      setRecentTransfers([]);
    }
  };

  // 선택 금액 입력 필드에 설정
  const handleAmountSelect = (selectedAmount) => {
    setAmount(Number(selectedAmount));
  };

  // 최근 이체자 수정
  const handleSender = (index) => {
    setClickedIndex(index);
    setSender(recentTransfers[index].nickname);
  };

  // 모달 확정 함수
  const handleConfirm = () => {
    console.log('예 버튼 클릭됨!');
    // 예 버튼 클릭 시 수행할 작업
    setIsModalVisible(false); // 모달 숨기기
  };

  // 모달 취소 함수
  const handleCancel = () => {
    console.log('아니오 버튼 클릭됨!');
    // 아니오 버튼 클릭 시 수행할 작업
    setIsModalVisible(false); // 모달 숨기기
  };

  // 닉네임 조회
  const handleSearchNick = async (nickname) => {
    try {
      const user = await checkAnotherUser(nickname);
      setAnotherUser(user);
      setIsNickModalVisible(true);
    } catch (error) {
      console.error('Error in checkAnotherUser:', error);
      setIsCheckModalVisible(true);
    }
  };

  // 닉네임 모달 확정 함수
  const handleNickConfirm = () => {
    setIsNickModalVisible(false);
  };

  // 닉네임 모달 취소 함수
  const handleNickCancel = () => {
    setIsNickModalVisible(false);
  };

  // 닉네임 체크 모달 확인 함수
  const handleCheckConfirm = () => {
    setIsCheckModalVisible(false);
  };

  // 최근 이체 내역 설정
  useEffect(() => {
    fetchRecentTransfers();
  }, []);

  return (
    <div className="flex gap-3">
      {isModalVisible && (
        <Modal onConfirm={handleConfirm} onCancel={handleCancel}></Modal>
      )}
      {isNickModalVisible && (
        <Modal
          onConfirm={handleNickConfirm}
          onCancel={handleNickCancel}
          imageUrl={anotherUser.imageUrl}
          content={anotherUser.nickname}
        >
          해당 닉네임이 맞습니까?
        </Modal>
      )}
      {isCheckModalVisible && (
        <CheckModal onConfirm={handleCheckConfirm} isSuccess={false}>
          해당 닉네임은 없습니다.
        </CheckModal>
      )}
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
              value={password || ''}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^\d*$/;
                if (regex.test(value)) {
                  // 입력된 값이 숫자인 경우에만 상태를 업데이트합니다.
                  setPassword(Number(value));
                }
              }}
            />
          </label>
        </div>
        <div className="flex flex-col gap-5 rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-5">
          <h3 className="text-xl">입금 정보</h3>
          <div className="flex flex-col gap-7 rounded-xl border-2 border-solid border-gray-300 bg-gray-50 p-5">
            <div className="flex w-full justify-between">
              <button
                onClick={() => handleAmountSelect(10000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                1만원
              </button>
              <button
                onClick={() => handleAmountSelect(50000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                5만원
              </button>
              <button
                onClick={() => handleAmountSelect(100000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                10만원
              </button>
              <button
                onClick={() => handleAmountSelect(500000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                50만원
              </button>
              <button
                onClick={() => handleAmountSelect(1000000)}
                className="w-1/6 border-r-2 border-solid border-gray-300 text-center"
              >
                100만원
              </button>
              <button
                onClick={() => handleAmountSelect(100000)}
                className="w-1/6 text-center"
              >
                전액
              </button>
            </div>
            <label className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300">
              <input
                value={amount || ''}
                type="text"
                className="grow"
                placeholder="입금금액"
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^\d*$/;
                  if (regex.test(value)) {
                    // 입력된 값이 숫자인 경우에만 상태를 업데이트합니다.
                    setAmount(Number(value));
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
              defaultChecked
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
                    onClick={() => {
                      handleSender(recentTransfer.nickname);
                    }}
                    className={
                      clickedIndex === idx ? 'border-double border-red-600' : ''
                    }
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
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleSearchNick(sender);
                  }}
                  className="h-full rounded-r-lg border-2 bg-gray-300 bg-lime-500 px-7 text-white hover:bg-lime-800"
                >
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
            password={password}
            recipient={sender}
            sender={sender}
            amount={amount}
            balance={30000}
            onTransferResult={handleTransferResult}
            onTransferCancel={handleTransferCancel}
          ></TransferCheck>
        )}
      </div>
    </div>
  );
}
