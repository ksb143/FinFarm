import { accountCheck } from '@/api/bank';

import BankBasicinfo from '@/components/bank/BankBasicInfo';
import BankAccountTable from '@/components/bank/BankAccount/BankAccountTable';
import { useState } from 'react';

export default function BankAccountPage() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [transitionType, setTransitionType] = useState('all');
  const [recordName, setRecordName] = useState('');
  const [recordsView, setRecordView] = useState(15);
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedRange, setSelectedRange] = useState('');
  const [accountData, setAccountData] = useState(null);

  // 함수
  const setDateRange = (days) => {
    setSelectedRange(days);
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  };

  const handleAccountData = async (accountContent) => {
    try {
      const data = await accountCheck(accountContent);
      setAccountData(data);
    } catch (error) {
      console.log('조회 실패:', error);
    }
  };

  // 버튼 스타일
  const dateButtonStyle = (days) =>
    `min-w-20 rounded-lg border-2 border-solid border-gray-300 ${
      selectedRange === days
        ? 'bg-lime-500 text-white'
        : 'bg-gray-100 text-black'
    } py-1`;

  const typeButtonStyle = (type) =>
    `w-full rounded-lg border-2 border-solid border-gray-300 ${transitionType === type ? 'bg-lime-500 text-white' : 'bg-gray-100 text-black'} py-1`;

  // 데이터
  const dateRanges = [
    { text: '당일', days: 0 },
    { text: '3일', days: 2 },
    { text: '1주', days: 6 },
    { text: '1개월', days: 30 },
    { text: '3개월', days: 90 },
  ];

  const recordNums = [
    { text: '15건', num: 15, checked: true, id: 'record15' },
    { text: '30건', num: 30, checked: false, id: 'record30' },
    { text: '50건', num: 50, checked: false, id: 'record50' },
    { text: '100건', num: 100, checked: false, id: 'record100' },
  ];

  const accountContent = {
    startDate,
    endDate,
    transitionType,
    recordName,
    sortOrder,
  };

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
            {dateRanges.map((dateRange, idx) => (
              <button
                key={idx}
                onClick={() => setDateRange(dateRange.days)}
                className={dateButtonStyle(dateRange.days)}
              >
                {dateRange.text}
              </button>
            ))}
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
              onClick={() => setTransitionType('withdraw')}
              className={typeButtonStyle('withdraw')}
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
            onChange={(e) => {
              setRecordName(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center">
          <div className="w-1/12">정렬 방식</div>
          <div className="flex w-6/12 items-center justify-around">
            <div className="text-sm text-gray-500">건수</div>
            {recordNums.map((record, idx) => (
              <div className="flex items-center gap-3" key={idx}>
                <input
                  type="radio"
                  name="views"
                  className="radio"
                  value={record.num}
                  id={record.id}
                  defaultChecked={record.checked}
                  onChange={(e) => setRecordView(Number(e.target.value))}
                />
                <label htmlFor={record.id} className="text-xs">
                  {record.text}
                </label>
              </div>
            ))}
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
                onChange={(e) => setSortOrder(e.target.value)}
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
                onChange={(e) => setSortOrder(e.target.value)}
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
          className="w-2/6 rounded-lg bg-lime-500 py-1 font-hopang text-white hover:bg-lime-800 hover:shadow-lime-800/50 hover:drop-shadow-lg"
          onClick={() => handleAccountData(accountContent)}
        >
          조회
        </button>
      </div>
      <div className="overflow-x-auto">
        {accountData && (
          <BankAccountTable
            data={accountData}
            recordsView={recordsView}
          ></BankAccountTable>
        )}
      </div>
    </div>
  );
}
