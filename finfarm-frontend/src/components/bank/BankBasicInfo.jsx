import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkBalance } from '@/api/bank';
import useUserStore from '@/store/userStore';
import useBankStore from '@/store/bankStore';

import Button from '@/components/layout/Button';

import PropTypes from 'prop-types';

BankBasicinfo.propTypes = {
  isButton: PropTypes.bool,
};

export default function BankBasicinfo({ isButton }) {
  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));

  const { accountBalance, setAccountBalance } = useBankStore((state) => ({
    accountBalance: state.accountBalance,
    setAccountBalance: state.setAccountBalance,
  }));

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = await checkBalance(); // 비동기 호출을 기다림
        setAccountBalance(userBalance); // 상태 업데이트
      } catch (error) {
        console.error(`계좌 잔액 조회 실패: ${error}`);
      }
    };
    fetchBalance(); // 비동기 함수 실행
  }, [setAccountBalance]);

  // 네비게이션
  const navigate = useNavigate();
  const goToTransfer = () => {
    navigate('/bank/transfer');
  };
  const goToPasswordChange = () => {
    navigate('/bank/password/change');
  };

  return (
    <div className="flex w-full items-center justify-between rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-3">
      <div className="mr-3 flex-1 border-r-2 border-solid border-gray-300">
        {nickname}님의 통장
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex gap-10 ps-3">
          <span>계좌잔액</span>
          <span className="text-lime-800">
            {accountBalance.toLocaleString('ko-KR')}원
          </span>
        </div>
        {isButton ? (
          <div className="flex gap-3">
            <Button onClickEvent={goToTransfer}>계좌이체 하기</Button>
            <Button onClickEvent={goToPasswordChange}>비밀번호 변경</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
