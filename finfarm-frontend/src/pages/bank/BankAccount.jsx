import BankBasicinfo from '@/components/bank/BankBasicInfo';
import BankAccountTable from '@/components/bank/BankAccount/BankAccountTable';
import { useState } from 'react';

export default function BankAccount() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transitionType, setTransitionType] = useState('all');
  const [accountNumber, setAccountNumber] = useState('');
  const [recordsView, setRecordView] = useState(15);
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedRange, setSelectedRange] = useState('');

  const setDateRange = (days) => {
    setSelectedRange(days);
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  };

  const dateButtonStyle = (days) =>
    `min-w-20 rounded-lg border-2 border-solid border-gray-300 ${
      selectedRange === days
        ? 'bg-lime-500 text-white'
        : 'bg-gray-100 text-black'
    } py-1`;

  const typeButtonStyle = (type) =>
    `w-full rounded-lg border-2 border-solid border-gray-300 ${transitionType === type ? 'bg-lime-500 text-white' : 'bg-gray-100 text-black'} py-1`;

  const handleSubmit = () => {};

  return (
    <div className="mx-24 flex flex-col gap-3 px-4">
      <BankBasicinfo isButton={true} />
      <div className="flex w-full flex-col gap-7 rounded-xl border-2 border-solid border-gray-300 bg-white p-5">
        <div className="flex items-center">
          <div className="flex w-6/12 items-center">
            <div className="w-2/12">조회 기간</div>
            <div className="flex w-9/12 justify-between rounded-lg border-2 border-solid border-gray-300 bg-white px-10 py-1">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
              <span>-</span>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex w-6/12 items-center justify-between">
            <button
              onClick={() => setDateRange(0)}
              className={dateButtonStyle(0)}
            >
              당일
            </button>
            <button
              onClick={() => setDateRange(2)}
              className={dateButtonStyle(2)}
            >
              3일
            </button>
            <button
              onClick={() => setDateRange(6)}
              className={dateButtonStyle(6)}
            >
              1주
            </button>
            <button
              onClick={() => setDateRange(30)}
              className={dateButtonStyle(30)}
            >
              1개월
            </button>
            <button
              onClick={() => setDateRange(90)}
              className={dateButtonStyle(90)}
            >
              3개월
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/12">조회 내용</div>
          <div className="flex w-11/12 items-center justify-between gap-3">
            <button
              onClick={() => setTransitionType('all')}
              className={typeButtonStyle('all')}
            >
              전체(입금 + 출금)
            </button>
            <button
              onClick={() => setTransitionType('deposit')}
              className={typeButtonStyle('deposit')}
            >
              출금 내역
            </button>
            <button
              onClick={() => setTransitionType('withdrawal')}
              className={typeButtonStyle('withdrawal')}
            >
              입금 내역
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/12">적요 내용</div>
          <input
            type="text"
            placeholder="조회할 계좌번호를 입력하세요"
            className="w-11/12 rounded-lg border-2 border-solid border-gray-300 bg-white px-5 py-1"
          />
        </div>
        <div className="flex items-center">
          <div className="w-1/12">정렬 방식</div>
          <div className="flex w-6/12 items-center justify-around">
            <div className="text-sm text-gray-500">건수</div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="views"
                className="radio"
                value={15}
                id="records15"
                defaultChecked
              />
              <label htmlFor="records15" className="text-xs">
                15건
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="views"
                className="radio"
                value={30}
                id="records30"
              />
              <label htmlFor="records30" className="text-xs">
                30건
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="views"
                className="radio"
                value={50}
                id="records50"
              />
              <label htmlFor="records50" className="text-xs">
                50건
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="views"
                className="radio"
                value={100}
                id="records100"
              />
              <label htmlFor="records100" className="text-xs">
                100건
              </label>
            </div>
          </div>
          <div className="flex w-5/12 items-center justify-around">
            <div className="text-sm text-gray-500">순서</div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sorting"
                className="radio"
                value={'newest'}
                id="newest"
                defaultChecked
              />
              <label htmlFor="newest" className="text-xs">
                최근거래먼저
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sorting"
                className="radio"
                value={'oldest'}
                id="oldest"
              />
              <label htmlFor="oldest" className="text-xs">
                과거거래먼저
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-2/6 rounded-lg bg-lime-500 py-1 font-hopang text-white hover:bg-lime-800 hover:shadow-lime-800/50 hover:drop-shadow-lg "
        >
          조회
        </button>
      </div>
      <div className="overflow-x-auto">
        <BankAccountTable></BankAccountTable>
      </div>
    </div>
  );
}
