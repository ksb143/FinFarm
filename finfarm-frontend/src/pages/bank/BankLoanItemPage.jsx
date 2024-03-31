import { useState } from 'react';

import useUserStore from '@/store/userStore';
import firstFamerLoan from '@/assets/images/firstFamerLoan.png';
import { loanQualificate, loan } from '@/api/bank';
import Modal from '@/components/layout/Modal';
import CheckModal from '@/components/layout/CheckModal';

export default function BankLoanItemPage() {
  const { nickname: nickname, dateOfSignup: dateOfSignup } = useUserStore(
    (state) => ({
      nickname: state.nickname,
      dateOfSignup: state.dateOfSignup,
    }),
  );

  const [afterQualification, setAfterQualification] = useState(false); // 대출 심사 후 페이지
  const [loanQualificationInfo, setLoanQualificationInfo] = useState({
    canLoan: true,
    isCurrentlyLoan: true,
    haveOverDue: true,
  }); // 상환 가능 여부
  const [amount, setAmount] = useState(''); // 대출 금액
  const [visibleModal, setVisibleModal] = useState(false); // 모달창 유무
  const [visibleCheckModal, setVisibleCheckModal] = useState(false); // 체크 모달창 유무
  const [successLoan, setSuccessLoan] = useState(false); // 대출 성공 여부

  // 대출 심사 함수
  const handleLoanQualificate = async () => {
    try {
      const qualificationInfo = await loanQualificate(2);
      setLoanQualificationInfo({
        canLoan: qualificationInfo.canLoan,
        isCurrentlyLoan: qualificationInfo.isCurrentlyLoan,
        haveOverDue: qualificationInfo.haveOverDue,
      });
      setAfterQualification(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 대출 신청 함수
  const handleLoanConfirm = async (password) => {
    if (!password) {
      alert('계좌 비밀번호를 입력해주세요');
    } else if (password.length < 4) {
      alert('계좌 비밀번호 4자리를 입력해주세요');
    } else {
      try {
        const loanInfo = await loan({
          loanPk: 2,
          amount: amount,
          accountPassword: password,
        });
        setSuccessLoan(true);
      } catch (error) {
        console.log(error);
      }
      setVisibleModal(false);
      setVisibleCheckModal(true);
    }
  };

  const currentDate = new Date(); // 현재 날짜
  const sevenDaysLater = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
  ); // 7일후 날짜
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // 포맷 옵션
  let formattedDate = sevenDaysLater
    .toLocaleDateString('ko-KR', options)
    .replace(/[\s.-]+/g, '-');
  formattedDate = formattedDate.replace(/-$/, ''); // 포맷된 날짜

  // 가입일이 7일 지났는지 확인
  const signupDate = new Date(dateOfSignup);
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const daysSinceSignup = currentDate - signupDate;
  const overSevenDays = daysSinceSignup > sevenDays;

  return (
    <div className="mx-24 flex flex-col items-center rounded-xl border-2 border-gray-300 bg-white p-8">
      {visibleModal && (
        <Modal
          isInput={true}
          content={`${amount.toLocaleString('ko-KR')}원의 금액으로,\n주 10% 금리 적용하며\n상환일은 ${formattedDate}입니다.`}
          onConfirm={() => {
            handleLoanConfirm(password);
          }}
          onCancel={() => {
            setVisibleModal(false);
          }}
        >
          {nickname} 님 아래 조건으로 대출신청하겠습니까?
        </Modal>
      )}
      {visibleCheckModal &&
        (successLoan ? (
          <CheckModal
            isSuccess={successLoan}
            onConfirm={() => setVisibleCheckModal(false)}
          >
            대출에 성공했습니다
          </CheckModal>
        ) : (
          <CheckModal
            isSuccess={successLoan}
            onConfirm={() => setVisibleCheckModal(false)}
          >
            대출에 실패했습니다
          </CheckModal>
        ))}
      <div className="flex">
        <div className="flex w-2/3 flex-col gap-5">
          <h1 className="font-hopang text-5xl">퍼스트 파머론</h1>
          <p>초보 농부들을 위한 대표 상품</p>
          <p className="w-full border-2 border-gray-300"></p>
          {afterQualification ? (
            <>
              {loanQualificationInfo.canLoan ? (
                <>
                  <p>
                    귀하는 <span className="text-blue-600">대출 가능</span>{' '}
                    대상입니다 😁{' '}
                  </p>
                  <ul className="leading-10">
                    <li>대출 가능 금액: 1,000,000원</li>
                    <li>대출 금리: 10%</li>
                    <li>최종 상환일: {formattedDate}</li>
                  </ul>
                  <label className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300">
                    <input
                      value={amount.toLocaleString('ko-KR')}
                      type="text"
                      className="grow"
                      placeholder="입금금액"
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 모든 문자 제거
                        value = value ? Math.min(Number(value), 1000000) : ''; // 최대값 백만원 제한
                        setAmount(value); // 값 설정
                      }}
                    />
                    <span>원</span>
                  </label>
                </>
              ) : (
                <>
                  {' '}
                  <p>
                    귀하는 아래 이유로{' '}
                    <span className="text-red-600">대출 불가능</span> 대상입니다
                    😥
                  </p>
                  <ul className="leading-10">
                    {loanQualificationInfo.isCurrentlyLoan && (
                      <li>현재 해당 상품에 가입 중입니다.</li>
                    )}
                    {overSevenDays && <li>가입한 지 일주일 지났습니다.</li>}
                    {loanQualificationInfo.haveOverDue && (
                      <li>연체 전적이 있습니다.</li>
                    )}
                  </ul>
                </>
              )}
            </>
          ) : (
            <>
              <ul className="leading-10">
                <li>대출 대상: 초보농부, 가입 일주일 미만 농부</li>
                <li>대출 금리: 10%</li>
                <li>대출 한도: 1,000,000원 (일백만원)</li>
                <li>대출 기간: 일주일</li>
              </ul>
              <p className="w-full border-2 border-gray-300"></p>
              <p className="font-medium text-red-600">
                연체가 지속될 경우 계좌, 현금, 지력 순으로 압류가 진행됩니다.
              </p>
            </>
          )}
        </div>
        <div>
          <img src={firstFamerLoan} alt="first farmer loan image" />
        </div>
      </div>
      {afterQualification ? (
        loanQualificationInfo.canLoan && (
          <button
            onClick={() => setVisibleModal(true)}
            className="btn mt-3 min-w-72 rounded-lg bg-lime-500 font-hopang text-lg text-white hover:bg-lime-800"
          >
            대출 신청
          </button>
        )
      ) : (
        <button
          onClick={handleLoanQualificate}
          className="btn mt-3 min-w-72 rounded-lg bg-lime-500 font-hopang text-lg text-white hover:bg-lime-800"
        >
          대출 심사
        </button>
      )}
    </div>
  );
}
