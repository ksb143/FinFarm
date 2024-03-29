import { useEffect, useState } from 'react';

import { checkBalance } from '@/api/bank';
import useUserStore from '@/store/userStore';

import Button from '@/components/layout/Button';

import PropTypes from 'prop-types';
BankBasicinfo.propTypes = {
  isButton: PropTypes.bool,
};

export default function BankBasicinfo({ isButton }) {
  const [balance, setBalance] = useState(0);

  const { nickname: nickname } = useUserStore((state) => ({
  nickname: state.nickname,
  }));

  useEffect(() => {
    const userBalance = checkBalance();
    setBalance(userBalance);
  }, []);

  return (
    <div className="flex w-full items-center justify-between rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-3">
      <div className="mr-3 flex-1 border-r-2 border-solid border-gray-300">
        `${nickname}님의 통장`
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex gap-10 ps-3">
          <span>계좌잔액</span>
          <span className="text-lime-800">
            {balance.toLocaleString('ko-KR')}원
          </span>
        </div>
        {isButton ? (
          <div className="flex gap-3">
            <Button>계좌이체 하기</Button>
            <Button>비밀번호 변경</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
