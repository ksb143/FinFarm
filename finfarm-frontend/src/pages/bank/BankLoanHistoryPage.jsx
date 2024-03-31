import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { loanHistory, loanRepay } from '@/api/bank';

import CurrentLoan from '@/components/bank/BankLoan/CurrentLoan';
import LoanHistory from '@/components/bank/BankLoan/LoanHistory';
import Modal from '@/components/layout/Modal';
import CheckModal from '@/components/layout/CheckModal';

import loanItem from '@/assets/images/loanItem.png';

export default function BankLoanHistoryPage() {
  const [loanAmount, setLoanAmount] = useState(''); // 대출 금액
  const [loanRepayAmount, setLoanRepayAmount] = useState(); // 상환 금액
  const [currentLoanData, setCurrentLoanData] = useState([]); // 현재 대출 기록
  const [loanHistories, setLoanHistories] = useState([]); // 모든 대출 기록
  const [visibleModal, setVisibleModal] = useState(false); // 모달창 유무
  const [visibleCheckModal, setVisibleCheckModal] = useState(false); // 체크 모달창 유무
  const [repaymentSuccess, setRepaymentSuccess] = useState(false); // 상환 성공
  const [repayInfo, setRepayInfo] = useState({
    loanIndex: '',
    pk: '',
    name: '',
    repayAmount: '',
    password: '',
  }); // 상환 시 제공 정보
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    // 캐로셀 초기설정
  });

  // 상환하기 버튼 클릭
  const handleRepay = (pk, repayAmount, name) => {
    setRepayInfo({
      loanPk: pk,
      loanName: name,
      repayAmount: repayAmount,
      password: '',
    });
    setVisibleModal(true);
  };

  // 상환 확인
  const handleLoanConfirm = async (password) => {
    if (!password) {
      alert('계좌 비밀번호를 입력해주세요');
    } else if (password.length < 4) {
      alert('계좌 비밀번호 4자리를 입력해주세요');
    } else {
      setRepayInfo((prevState) => ({
        ...prevState,
        password: password,
      }));
      try {
        await loanRepay(repayInfo);
        const historyResponse = await loanHistory();
        setCurrentLoanData(historyResponse.currentLoans);
        setLoanHistories(historyResponse.loanHistories);
        setLoanAmount(historyResponse.totalTakeAmount);
        setLoanRepayAmount(historyResponse.totalRepayAmount);
        setRepaymentSuccess(true);
      } catch (error) {
        console.error(error);
      }
      setVisibleModal(false); // 상환 모달 닫기
      setVisibleCheckModal(true); // 상환 체크 모달 열기
    }
  };

  // 상환 취소
  const handleLoanCancel = () => {
    setVisibleModal(false);
    setRepayInfo({
      loanPk: '',
      loanName: '',
      repayAmount: '',
      password: '',
    });
  };

  // 상환 완료 후 체크모달
  const closeCheckModal = () => {
    setVisibleCheckModal(false);
    setRepaymentSuccess(false);
  };

  // 초반 대출 기록 및 대출 금액 업데이트
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await loanHistory();
        setCurrentLoanData(response.currentLoans);
        setLoanHistories(response.loanHistories);
        setLoanAmount(response.totalTakeAmount);
        setLoanRepayAmount(response.totalRepayAmount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoanData();
  }, []);

  // 캐로셀 설정 업데이트
  useEffect(() => {
    const newSettings = {
      ...sliderSettings,
      slidesToShow:
        currentLoanData.length === 1 ? 1 : Math.min(3, currentLoanData.length),
      slidesToScroll:
        currentLoanData.length === 1 ? 1 : Math.min(3, currentLoanData.length),
    };
    setSliderSettings(newSettings);
    console.log('Updating slider settings:', newSettings);
  }, [currentLoanData.length]);

  return (
    <div className="mx-24">
      {visibleModal && (
        <Modal
          isInput={true}
          content={`${repayInfo.loanName}의 \n 대출 잔액 ${repayInfo.repayAmount}원 타입은 아래와 같습니다.`}
          onConfirm={handleLoanConfirm}
          onCancel={handleLoanCancel}
        >
          상환하실 금액을 확인해주세요.
        </Modal>
      )}
      {visibleCheckModal &&
        (repaymentSuccess ? (
          <CheckModal onConfirm={closeCheckModal} isSuccess={repaymentSuccess}>
            대출 상환 완료
          </CheckModal>
        ) : (
          <CheckModal nConfirm={closeCheckModal} isSuccess={repaymentSuccess}>
            대출 상환 실패
          </CheckModal>
        ))}
      <div className="m">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-5 text-2xl">대출 현황</h1>
            <div>
              <span className="mr-16">총 상환 금액</span>
              <span>총 {loanRepayAmount.toLocaleString('ko-KR')}원</span>
            </div>
            <div>
              <span className="mr-16">총 대출 금액</span>
              <span>총 {loanAmount.toLocaleString('ko-KR')}원</span>
            </div>
          </div>
          <Link to="/bank/loan/item">
            <div className="flex items-center rounded-lg bg-blue-600 px-6 py-4 font-hopang text-white">
              <img src={loanItem} alt="loan_items" />
              더 많은 대출상품 <br />
              알아보기
            </div>
          </Link>
        </div>
        {currentLoanData.length > 3 ? (
          <Slider {...sliderSettings}>
            {currentLoanData.map((currentDatum, idx) => (
              <div className="mt-4" key={idx}>
                <CurrentLoan
                  loanIndex={idx}
                  pk={currentDatum.pk}
                  name={currentDatum.name}
                  interest={currentDatum.interest}
                  startDate={currentDatum.startDate}
                  endDate={currentDatum.endDate}
                  amount={currentDatum.amount}
                  repayAmount={currentDatum.repayAmount}
                  dDay={currentDatum.dDay}
                  onRepay={() => {
                    handleRepay(
                      currentDatum.pk,
                      currentDatum.repayAmount,
                      currentDatum.name,
                    );
                  }}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center gap-5">
            {currentLoanData.map((currentDatum, idx) => (
              <div className="mt-4" key={idx}>
                <CurrentLoan
                  pk={currentDatum.pk}
                  name={currentDatum.name}
                  interest={currentDatum.interest}
                  startDate={currentDatum.startDate}
                  endDate={currentDatum.endDate}
                  amount={currentDatum.amount}
                  repayAmount={currentDatum.repayAmount}
                  dDay={currentDatum.dDay}
                  onRepay={() => {
                    handleRepay(
                      currentDatum.pk,
                      currentDatum.repayAmount,
                      currentDatum.name,
                    );
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <h1 className="my-5 text-2xl">대출 상품</h1>
      <LoanHistory data={loanHistories} recordsView={15}></LoanHistory>
    </div>
  );
}
