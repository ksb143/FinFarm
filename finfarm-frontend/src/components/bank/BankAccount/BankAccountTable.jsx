import { useState } from 'react';
import PropTypes from 'prop-types';

BankAccountTable.propTypes = {
  data: PropTypes.object,
  recordsView: PropTypes.number,
};

export default function BankAccountTable({ data, recordsView }) {
  const dataList = data.bankingAccountDetailList;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsView;
  const indexOfFirstRecord = indexOfLastRecord - recordsView;
  const currentRecords = dataList.slice(indexOfFirstRecord, indexOfLastRecord);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <table className="table rounded-none bg-white">
        {/* head */}
        <thead>
          <tr className="bg-gray-300 text-center">
            <th>거래일시</th>
            <th>구분</th>
            <th>닉네임</th>
            <th>입금액</th>
            <th>출금액</th>
            <th>잔액</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentRecords.map((datum, idx) => (
            <tr key={idx}>
              <td>
                {formatDate(datum.accountDate)} <br />
                <span className="text-xs text-gray-500">
                  {formatTime(datum.accountDate)}
                </span>
              </td>
              <td>{datum.type}</td>
              <td>{datum.nickname}</td>
              <td className="text-blue-600">
                {datum.amount >= 0
                  ? `+${datum.amount.toLocaleString('ko-KR')}`
                  : ''}
              </td>
              <td className="text-red-600">
                {datum.amount < 0 ? datum.amount.toLocaleString('ko-KR') : ''}
              </td>
              <td>{datum.accountBalanceAtThatTime.toLocaleString('ko-KR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        recordsPerPage={recordsView}
        totalRecords={dataList.length}
        currentPage={currentPage}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </>
  );
}

// 페이지네이션 컴포넌트
function Pagination({
  recordsPerPage,
  totalRecords,
  currentPage,
  onPageChange,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => onPageChange(number)}
              className={`page-link ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  recordsPerPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
