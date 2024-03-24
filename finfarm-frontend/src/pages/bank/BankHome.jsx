import './BankHome.css';

import Ad from '@/components/bank/Ad';
import SquareButton from '@/components/layout/SquareButton';

export default function BankHome() {
  return (
    <>
      <div className="flex justify-center gap-5 bg-lime-100 py-5 mx-[-8rem]">
        <SquareButton>조회</SquareButton>
        <SquareButton>입출금</SquareButton>
        <SquareButton>이체</SquareButton>
        <SquareButton>대출</SquareButton>
      </div>
    </>
  );
}
