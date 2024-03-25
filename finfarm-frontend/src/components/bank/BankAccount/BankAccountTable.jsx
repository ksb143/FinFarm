import { useState } from 'react';
import PropTypes from 'prop-types';

BankAccountTable.propTypes = {
  data: PropTypes.object,
  recordsView: PropTypes.number,
};

export default function BankAccountTable({ data, recordsView }) {
  const dataList = data.accountDetailDto;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsView;
  const indexOfFirstRecord = indexOfLastRecord - recordsView;
  const currentRecords = dataList.slice(indexOfFirstRecord, indexOfLastRecord);
  return (
    <>
      <table className="table rounded-none bg-white">
        {/* head */}
        <thead>
          <tr className="bg-gray-300">
            <th>거래일시</th>
            <th>구분</th>
            <th>닉네임</th>
            <th>출금액</th>
            <th>입금액</th>
            <th>잔액</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((datum, idx) => (
            <tr key={idx}>
              <td>{datum.odate}</td>
              <td>{datum.type}</td>
              <td>{datum.nickname}</td>
              <td>{datum.amount >= 0 ? datum.amount : ''}</td>
              <td>{datum.amount < 0 ? datum.amount : ''}</td>
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
