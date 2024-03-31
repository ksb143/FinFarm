import { useState, useEffect } from 'react';

import { withdrawCash, depositCash } from '@/api/bank';
import CheckModal from '@/components/layout/CheckModal';
import BankBasicinfo from '@/components/bank/BankBasicInfo';
import useUserStore from '@/store/userStore';
import useBankStore from '@/store/bankStore';

export default function BankAtmPage() {
  // 선택된 버튼을 추적하는 state 추가
  const [selectedOption, setSelectedOption] = useState('deposit'); // 입출금 버튼
  const [depositAmount, setDepositAmount] = useState(''); // 입금 금액
  const [depositCheck, setDepositCheck] = useState(false); // 입금 확인란
  const [withdrawAmount, setWithdrawAmount] = useState(''); // 출금 금액
  const [password, setPassword] = useState(''); // 출금 패스워드
  const [withdrawCheck, setWithdrawCheck] = useState(false); // 출금 확인란
  const [visibleDepositCheckModal, setVisibleDepositCheckModal] =
    useState(false); // 입금 체크 모달
  const [depositSuccess, setDepositSuccess] = useState(true); // 입금 성공
  const [visibleWithdrawCheckModal, setVisibleWithdrawCheckModal] =
    useState(false); // 출금 체크 모달
  const [withdrawSuccess, setWithdrawSuccess] = useState(true); // 출금 성공

  const charge = 1000; // 수수료

  const { nickname, pointsInthePocket, setPointsInthePocket } = useUserStore(
    (state) => ({
      nickname: state.nickname,
      pointsInthePocket: state.pointsInthePocket,
      setPointsInthePocket: state.setPointsInthePocket,
    }),
  ); // 유저 닉네임 및 현금

  const { accountBalance, setAccountBalance } = useBankStore((state) => ({
    accountBalance: state.accountBalance,
    setAccountBalance: state.setAccountBalance,
  })); // 유저 계좌 잔액

  // 입금 확인
  const handleDepositCheck = () => {
    if (!depositAmount) {
      alert('입금 금액을 입력해주세요');
    } else if (depositAmount > pointsInthePocket) {
      alert('입금 금액이 현재 보유 현금보다 많습니다');
    } else {
      setDepositCheck(true);
    }
  };

  // 입금 실행
  const handleDepositConfirm = async () => {
    try {
      const response = await depositCash(depositAmount);
      setAccountBalance(response);
      setDepositSuccess(true);
    } catch (error) {
      console.error(error);
      setDepositSuccess(false);
    }
    setVisibleDepositCheckModal(true);
    setDepositCheck(false);
  };

  // 입금 취소
  const handleDepositCancel = () => {
    setDepositCheck(false);
  };

  // 출금 확인
  const handleWithdrawCheck = () => {
    if (!withdrawAmount && !password) {
      alert('인출 금액과 비밀번호를 입력해주세요');
    } else if (!withdrawAmount) {
      alert('인출 금액을 입력해주세요');
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
    } else if (password.length < 4) {
      alert('계좌 비밀번호 4자리를 입력해주세요');
    } else if (accountBalance < withdrawAmount) {
      alert('인출 금액이 현재 계좌 금액보다 많습니다');
    } else {
      setWithdrawCheck(true);
    }
  };

  // 출금 실행
  const handleWithdrawConfirm = async () => {
    const withdrawInfo = {
      amount: withdrawAmount,
      password: password,
    };
    try {
      const response = withdrawCash(withdrawInfo);
      setPointsInthePocket(response.curPoint);
      updateAccountBalance(response.accountBalance);
      setWithdrawSuccess(true);
    } catch (error) {
      console.error(error);
      setWithdrawSuccess(false);
    }
    setVisibleWithdrawCheckModal(true);
    setWithdrawCheck(false);
  };

  // 출금 취소
  const handleWithdrawCancel = () => {
    setWithdrawCheck(false);
  };

  // 입출금 변화에 따른 체크란 없애기
  useEffect(() => {
    if (selectedOption === 'deposit') {
      // 입금을 선택했을 때, withdrawCheck를 false로 설정
      setWithdrawCheck(false);
    } else if (selectedOption === 'withdraw') {
      // 출금을 선택했을 때, depositCheck를 false로 설정
      setDepositCheck(false);
    }
  }, [selectedOption]);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      {visibleDepositCheckModal &&
        (depositSuccess ? (
          <CheckModal
            isSuccess={depositSuccess}
            onConfirm={() => {
              setVisibleDepositCheckModal(false);
            }}
          >
            입금이 완료되었습니다
          </CheckModal>
        ) : (
          <CheckModal
            isSuccess={depositSuccess}
            onConfirm={() => {
              setVisibleDepositCheckModal(false);
            }}
          >
            입금에 실패했습니다
          </CheckModal>
        ))}
      {visibleWithdrawCheckModal &&
        (depositSuccess ? (
          <CheckModal
            isSuccess={withdrawSuccess}
            onConfirm={() => {
              setVisibleWithdrawCheckModal(false);
            }}
          >
            출금이 완료되었습니다
          </CheckModal>
        ) : (
          <CheckModal
            isSuccess={withdrawSuccess}
            onConfirm={() => {
              setVisibleWithdrawCheckModal(false);
            }}
          >
            출금에 실패했습니다
          </CheckModal>
        ))}
      <div className="flex w-10/12 gap-5">
        <input
          type="radio"
          id="deposit"
          name="transaction"
          checked={selectedOption === 'deposit'} // 선택된 옵션에 따라 checked 상태를 설정
          onChange={() => setSelectedOption('deposit')} // 클릭 시 선택된 옵션을 변경
          className="hidden" // 화면에 표시되지 않도록 함
        />
        <label
          htmlFor="deposit"
          className={`btn w-1/2 rounded-xl font-hopang text-2xl text-white 
            ${selectedOption === 'deposit' ? 'bg-lime-800' : 'bg-lime-500'} 
            hover:bg-lime-800`}
        >
          입금
        </label>
        <input
          type="radio"
          id="withdraw"
          name="transaction"
          checked={selectedOption === 'withdraw'} // 선택된 옵션에 따라 checked 상태를 설정
          onChange={() => setSelectedOption('withdraw')} // 클릭 시 선택된 옵션을 변경
          className="hidden" // 화면에 표시되지 않도록 함
        />
        <label
          htmlFor="withdraw"
          className={`btn w-1/2 rounded-xl font-hopang text-2xl text-white 
            ${selectedOption === 'withdraw' ? 'bg-lime-800' : 'bg-lime-500'} 
            hover:bg-lime-800`}
        >
          출금
        </label>
      </div>
      {selectedOption === 'deposit' ? (
        <div className="flex w-8/12 flex-col items-center justify-center gap-5 rounded-xl border-2 border-solid border-gray-300 bg-white p-5">
          <BankBasicinfo></BankBasicinfo>
          <input
            type="text"
            placeholder="입금계좌명"
            className="input input-bordered w-full rounded-xl border-2 border-solid border-gray-300"
            value={nickname || ''}
            readOnly
          />
          <label className="input input-bordered flex w-full items-center gap-2 border-2 border-solid border-gray-300">
            <input
              value={depositAmount.toLocaleString('ko-KR')}
              type="text"
              className="grow"
              placeholder="보낼 금액"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 모든 문자를 제거
                if (value) {
                  setDepositAmount(Number(value)); // 값이 있으면 숫자로 변환하여 설정
                } else {
                  setDepositAmount(''); // 값이 없으면 빈 문자열로 설정
                }
              }}
            />
            <span>원</span>
          </label>
          <button
            onClick={handleDepositCheck}
            className="btn-xl btn max-w-32 rounded-full bg-lime-500 text-center font-hopang text-xl text-white hover:bg-lime-800"
          >
            입금 하기
          </button>
        </div>
      ) : (
        <div className="flex w-8/12 flex-col items-center justify-center gap-5 rounded-xl border-2 border-solid border-gray-300 bg-white p-5">
          <BankBasicinfo></BankBasicinfo>
          <input
            type="text"
            placeholder="출금 계좌명"
            className="input input-bordered w-full rounded-xl border-2 border-solid border-gray-300"
            value={nickname || ''}
            readOnly
          />
          <label
            htmlFor="accountPassword"
            className="input input-bordered flex w-full items-center gap-2 rounded-xl border-2 border-solid border-gray-300 bg-white"
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
          <label className="input input-bordered flex w-full items-center gap-2 rounded-xl border-2 border-solid border-gray-300">
            <input
              value={withdrawAmount.toLocaleString('ko-KR')}
              type="text"
              className="grow"
              placeholder="인출 금액"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 모든 문자를 제거
                if (value) {
                  setWithdrawAmount(Number(value)); // 값이 있으면 숫자로 변환하여 설정
                } else {
                  setWithdrawAmount(''); // 값이 없으면 빈 문자열로 설정
                }
              }}
            />
            <span>원</span>
          </label>
          <button
            onClick={handleWithdrawCheck}
            className="btn-xl btn max-w-32 rounded-full bg-lime-500 text-center font-hopang text-xl text-white hover:bg-lime-800"
          >
            출금 하기
          </button>
        </div>
      )}
      {depositCheck && (
        <div className="flex w-7/12 flex-col items-center justify-center gap-7 rounded-xl border-2 border-solid border-gray-300 bg-white p-5">
          <h2 className="text-xl">입금 확인</h2>
          <div>
            <span>입금 계좌명</span>
            <span className="ml-96">{nickname}</span>
          </div>
          <div>
            <span>보낼 금액</span>
            <span className="ml-96">
              {depositAmount.toLocaleString('ko-KR')}
            </span>
            <span>원</span>
          </div>
          <div className="flex w-full items-center justify-evenly">
            <p>
              거래 정보를 확인해주세요.
              <br />
              입금을 하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDepositConfirm}
                className="rounded- btn min-w-20 rounded-3xl bg-lime-500 text-center font-hopang text-base text-white hover:bg-lime-800"
              >
                예
              </button>
              <button
                onClick={handleDepositCancel}
                className="rounded- btn min-w-20 rounded-3xl bg-lime-500 text-center font-hopang text-base text-white hover:bg-lime-800"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
      {withdrawCheck && (
        <div className="flex w-7/12 flex-col items-center justify-center gap-7 rounded-xl border-2 border-solid border-gray-300 bg-white p-5">
          <h2 className="text-xl">출금 확인</h2>
          <div>
            <span>출금 계좌명</span>
            <span className="ml-96">{nickname}</span>
          </div>
          <div>
            <span>거래 금액</span>
            <span className="ml-96">
              {depositAmount.toLocaleString('ko-KR')}
            </span>
            <span>원</span>
          </div>
          <div>
            <span>수수료</span>
            <span className="ml-96">{charge.toLocaleString('ko-KR')}</span>
            <span>원</span>
          </div>
          <div className="flex w-full items-center justify-evenly">
            <p>
              거래 정보를 확인해주세요.
              <br />
              출금을 하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleWithdrawConfirm}
                className="rounded- btn min-w-20 rounded-3xl bg-lime-500 text-center font-hopang text-base text-white hover:bg-lime-800"
              >
                예
              </button>
              <button
                onClick={handleWithdrawCancel}
                className="rounded- btn min-w-20 rounded-3xl bg-lime-500 text-center font-hopang text-base text-white hover:bg-lime-800"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
