import { useState, useEffect } from 'react';

import useUserStore from '@/store/userStore';
import useBankStore from '@/store/bankStore';

import BankBasicinfo from '@/components/bank/BankBasicInfo';
import TransferDetail from '@/components/bank/BankTransfer/TransferDetail';
import TransferCheck from '@/components/bank/BankTransfer/TransferCheck';
import danger from '@/assets/images/danger.png';
import Modal from '@/components/layout/Modal';
import CheckModal from '@/components/layout/CheckModal';

import {
  recentTransferDetails,
  checkAnotherUser,
  accountTransfer,
} from '@/api/bank';

export default function BankTransferPage() {
  const [transferInfo, setTransferInfo] = useState(false); // 이체 확인 컴포넌트 유무
  const [recentTransfers, setRecentTransfers] = useState([]); // 최근 이체 내역
  const [searchNick, setSearchNick] = useState(''); // 닉네임 검색
  const [password, setPassword] = useState(''); // 계좌 비밀번호
  const [amount, setAmount] = useState(''); // 금액
  const [recipient, setRecipient] = useState(''); // 받는 분
  const [isNickSearchSuccess, setIsNickSearchSuccess] = useState(true); // 닉네임 찾기 성공
  const [isNickModalVisible, setIsNickModalVisible] = useState(false); // 닉네임 모달 보이기 유무
  const [anotherUser, setAnotherUser] = useState({
    imageUrl: '',
    nickname: '',
  }); // anotherUser 상태 추가
  const [isTransferSuccess, setIsTransferSuccess] = useState(true); // 송금 성공
  const [isTransferCheckModal, setIsTransferCheckModal] = useState(false); // 송금 체크 모달

  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  })); // 유저 닉네임

  const { balance, setAccountBalance } = useBankStore({
    balance: state.accountBalance,
    setAccountBalance: state.updateAccountBalance,
  }); // 유저 계좌 잔액

  // 선택 금액 입력 필드에 설정
  const handleAmountSelect = (selectedAmount) => {
    setAmount(Number(selectedAmount));
  };

  // 닉네임 조회
  const handleSearchNick = async (nickname) => {
    try {
      const user = await checkAnotherUser(nickname);
      setAnotherUser(user);
      setIsNickSearchSuccess(true);
    } catch (error) {
      console.error('Error in checkAnotherUser:', error);
      setIsNickSearchSuccess(false);
    }
    setIsNickModalVisible(true);
  };

  // 이체 닉네임 선택
  const handleRecipient = (nickname) => {
    setRecipient(nickname);
    setIsNickModalVisible(false);
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

  // 이체 실행 버튼 함수
  const handleTransferInfo = () => {
    if (!recipient) {
      alert('송금자란을 기입해주세요');
    } else if (!amount) {
      alert('입금 금액란을 기입해주세요');
    } else if (balance < amount) {
      alert('송금 금액이 현재 계좌 보유 금액보다 많습니다');
    } else if (!password) {
      alert('계좌 비밀번호란을 기입해주세요');
    } else if (password.length < 4) {
      alert('계좌 비밀번호 4자리를 모두 기입해주세요');
    } else {
      setTransferInfo(true);
    }
  };

  // 이체 여부 확인 함수
  const handleTransferResult = async () => {
    const transferContent = {
      recipient: recipient,
      amount: amount,
      password: password,
    };
    try {
      const response = accountTransfer(transferContent);
      setAccountBalance(response.accountBalance);
      setIsTransferSuccess(true);
      fetchRecentTransfers();
    } catch (error) {
      console.error(error);
      setIsTransferSuccess(false);
    }
    setTransferInfo(false);
  };

  // 최근 이체 내역 설정
  useEffect(() => {
    fetchRecentTransfers();
  }, []);

  return (
    <div className="flex gap-3">
      {isTransferCheckModal &&
        (isTransferSuccess ? (
          <CheckModal
            isSuccess={isTransferSuccess}
            onConfirm={() => {
              setIsTransferCheckModal(false);
            }}
          >
            송금에 성공했습니다
          </CheckModal>
        ) : (
          <CheckModal
            isSuccess={isTransferSuccess}
            onConfirm={() => {
              setIsTransferCheckModal(false);
            }}
          >
            송금에 실패했습니다
          </CheckModal>
        ))}
      {isNickModalVisible &&
        (isNickSearchSuccess ? (
          <Modal
            onConfirm={() => {
              handleRecipient(anotherUser.nickname);
            }}
            onCancel={() => {
              setIsNickModalVisible(false);
            }}
            imageUrl={anotherUser.imageUrl}
            content={anotherUser.nickname}
          >
            해당 닉네임이 맞습니까?
          </Modal>
        ) : (
          <CheckModal
            onConfirm={() => {
              setIsNickModalVisible(false);
            }}
            isSuccess={false}
          >
            해당 닉네임은 없습니다.
          </CheckModal>
        ))}
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
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setPassword(value);
                } else if (
                  e.nativeEvent.inputType === 'deleteContentBackward'
                ) {
                  setPassword(value);
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
                onClick={() => handleAmountSelect(balance)}
                className="w-1/6 text-center"
              >
                전액
              </button>
            </div>
            <label className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300">
              <input
                value={amount.toLocaleString('ko-KR')}
                type="text"
                className="grow"
                placeholder="송금 금액"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 모든 문자를 제거
                  if (value) {
                    const numericValue = Number(value);
                    if (numericValue > balance) {
                      // 입력 값이 잔액을 초과하는 경우, 잔액으로 설정
                      setAmount(balance);
                    } else {
                      // 그렇지 않으면 입력 값으로 설정
                      setAmount(numericValue);
                    }
                  } else {
                    setAmount(''); // 값이 없으면 빈 문자열로 설정
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
                    nickName={recentTransfer.nickname}
                    profileImg={recentTransfer.imageUrl}
                    transferDate={recentTransfer.requestTime}
                    onClick={() => {
                      handleRecipient(recentTransfer.nickname);
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
                  value={searchNick}
                  onChange={(e) => setSearchNick(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleSearchNick(searchNick);
                  }}
                  className="h-full rounded-r-lg border-2 border-gray-300 bg-lime-500 px-7 text-white hover:bg-lime-800"
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
            recipient={recipient}
            sender={nickname}
            amount={amount}
            balance={balance}
            onTransferResult={handleTransferResult}
            onTransferCancel={() => {
              setTransferInfo(false);
            }}
          ></TransferCheck>
        )}
      </div>
    </div>
  );
}
