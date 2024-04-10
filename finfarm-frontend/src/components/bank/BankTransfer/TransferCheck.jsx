import PropTypes from 'prop-types';

TransferCheck.propTypes = {
  password: PropTypes.number,
  recipient: PropTypes.string,
  sender: PropTypes.string,
  briefs: PropTypes.string,
  amount: PropTypes.number,
  balance: PropTypes.number,
  onTransferExecute: PropTypes.func,
  onTransferCancel: PropTypes.func,
};

export default function TransferCheck({
  password,
  recipient,
  sender,
  amount,
  balance,
  onTransferExecute,
  onTransferCancel,
}) {
  const transferContent = {
    recipient,
    sender,
    amount,
    password,
  };

  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border-2 border-solid border-gray-300 bg-white px-5 py-8">
      <h1 className="text-center text-xl">이체 확인</h1>
      <div className="flex w-full">
        <div className="w-2/6">받는 분</div>
        <div className="w-4/6 border-b-2 text-center">{recipient}</div>
      </div>
      <div className="flex w-full">
        <div className="w-2/6">보내는 분</div>
        <div className="w-4/6 border-b-2 text-center">{sender}</div>
      </div>
      <div className="flex w-full">
        <div className="w-2/6">거래 금액</div>
        <div className="w-4/6 border-b-2 text-center">
          {amount.toLocaleString('ko-KR')}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/6">거래 후 잔액</div>
        <div className="w-4/6 border-b-2 text-center">
          {(balance - amount).toLocaleString('ko-KR')}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <span className="text-sm">
          거래 정보를 확인해주세요. <br />
          이체를 하시겠습니까?
        </span>
        <div className="flex gap-3">
          <button
            className="btn btn-sm min-w-16 rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800"
            onClick={onTransferExecute}
          >
            예
          </button>
          <button
            className="btn btn-sm min-w-16 rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800"
            onClick={onTransferCancel}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
