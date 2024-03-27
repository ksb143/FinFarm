import PropTypes from 'prop-types';

CurrentLoan.propTypes = {
  name: PropTypes.string,
  interest: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  amount: PropTypes.number,
  repayAmount: PropTypes.number,
  dDay: PropTypes.number,
};

export default function CurrentLoan({
  name,
  interest,
  startDate,
  endDate,
  amount,
  repayAmount,
  dDay,
}) {
  const startLoanDate = startDate
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '');
  const endLoanDate = endDate
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '');
  return (
    <div className="flex w-full flex-wrap items-center rounded-lg border-2 border-gray-300 bg-white p-5 lg:w-80">
      <div className="flex w-3/4 flex-col gap-1">
        <div className="flex items-center gap-10">
          <h3 className="text-xl">{name}</h3>
          <span className="text-sm">금리 주 {interest}%</span>
        </div>
        <p className="text-xs text-gray-500">
          <span>{startLoanDate}</span>
          <span>~</span>
          <span>{endLoanDate}</span>
        </p>
        <div className="flex w-full">
          <div className="w-1/2">대출 상환액</div>
          <div className="w-1/2">{repayAmount.toLocaleString('ko-KR')}원</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">대출 금액</div>
          <div className="w-1/2">{amount.toLocaleString('ko-KR')}원</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">최종 상환일까지</div>
          <span
            className={`w-1/2 ${dDay > 0 ? 'text-red-600' : 'text-blue-600'}`}
          >
            {dDay === 0
              ? 'D-day'
              : dDay > 0
                ? `D-${dDay}`
                : `D+${Math.abs(dDay)}`}
          </span>
        </div>
      </div>
      <button className="h-20 w-1/4  rounded-lg bg-lime-500 px-3 font-hopang text-xl text-white hover:border-4 hover:border-gray-300 hover:bg-lime-800">
        상환하기
      </button>
    </div>
  );
}
