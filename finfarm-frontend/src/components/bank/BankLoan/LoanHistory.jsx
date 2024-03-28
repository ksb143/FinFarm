import { useState } from 'react';
import PropTypes from 'prop-types';

LoanHistory.propTypes = {
  data: PropTypes.array,
  recordsView: PropTypes.number,
};

export default function LoanHistory({ data, recordsView }) {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsView;
  const indexOfFirstRecord = indexOfLastRecord - recordsView;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="mt-10 flex flex-col items-center">
      <table className="table rounded-none bg-white text-center">
        {/* head */}
        <thead>
          <tr className="bg-gray-300 text-lg">
            <th>대출 상품</th>
            <th>이자율 (주)</th>
            <th>대출금액</th>
            <th>대출 상환액</th>
            <th>대출시작일</th>
            <th>대출상환일</th>
            <th>대출상환기간</th>
            <th>상환여부</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((datum, idx) => (
            <tr key={idx}>
              <td>{datum.name}</td>
              <td>{datum.interest}%</td>
              <td>{datum.amount.toLocaleString('ko-KR')}원</td>
              <td>{datum.repayAmount.toLocaleString('ko-KR')}원</td>
              <td>
                {datum.startDate
                  .toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\.$/, '')}
              </td>
              <td>
                {datum.endDate
                  .toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\.$/, '')}
              </td>
              <td>{datum.period}일</td>
              <td>{datum.isRepay ? '상환' : '미상환'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        recordsPerPage={recordsView}
        totalRecords={data.length}
        currentPage={currentPage}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </div>
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
    <nav className="mt-5">
      <div className="join">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`btn join-item ${currentPage === number ? 'bg-lime-500' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
}

Pagination.propTypes = {
  recordsPerPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
