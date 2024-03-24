import PropTypes from 'prop-types';

BankBasicinfo.propTypes = {
  isButton: PropTypes.bool,
};
import Button from '@/components/layout/Button';

export default function BankBasicinfo({ isButton }) {
  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-3">
      <div className="mr-3 flex-1 border-r-2 border-solid border-gray-300">
        닉네임의 통장
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex gap-10">
          <span>계좌잔액</span>
          <span className="text-lime-800">{23000}원</span>
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
