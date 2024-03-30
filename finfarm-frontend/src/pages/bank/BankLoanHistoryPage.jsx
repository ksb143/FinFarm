import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CurrentLoan from '@/components/bank/BankLoan/CurrentLoan';
import LoanHistory from '@/components/bank/BankLoan/LoanHistory';
import Modal from '@/components/layout/Modal';

import loanItem from '@/assets/images/loanItem.png';

export default function BankLoanHistoryPage() {
  const [visibleModal, setVisibleModal] = useState(false); // 모달창 유무
  const [repayInfo, setRepayInfo] = useState({
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
  const handleRepay = async (pk, repayAmount, name) => {
    await setRepayInfo({
      loanPk: pk,
      loanName: name,
      loanRepayAmount: repayAmount,
      password: '',
    });
    setVisibleModal(true);
  };

  // 상환 확인
  const hadnleLoanConfirm = (password) => {
    setRepayInfo((prevState) => ({
      ...prevState,
      password: password,
    }));
  };

  // 상환 취소
  const handleLoanCancel = () => {
    setVisibleModal(false);
    setRepayInfo({
      loanPk: '',
      loanName: '',
      loanRepayAmount: '',
      password: '',
    });
  };

  useEffect(() => {
    // `currentLoanData`가 변경될 때 `settings`를 업데이트합니다.
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
          content={`${repayInfo.loanName}의 \n 대출 잔액 ${repayInfo.loanRepayAmount.toLocaleString('ko-KR')}원`}
          onConfirm={hadnleLoanConfirm}
          onCancel={handleLoanCancel}
        >
          상환하실 금액을 확인해주세요.
        </Modal>
      )}
      <div className="m">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-5 text-2xl">대출 현황</h1>
            <div>
              <span className="mr-16">총 상환 금액</span>
              <span>총 {}</span>
            </div>
            <div>
              <span className="mr-16">총 대출 금액</span>
              <span>총 {}</span>
            </div>
          </div>
          <Link to="/bank/loan/item">
            <div className="flex items-center rounded-lg bg-blue-600 px-6 py-4 font-hopang text-white">
              <img src={loanItem} alt="loan image" />
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
                  pk={currentDatum.pk}
                  name={currentDatum.name}
                  interest={currentDatum.interest}
                  startDate={currentDatum.startDate}
                  endDate={currentDatum.endDate}
                  amount={currentDatum.amount}
                  repayAmount={currentDatum.repayAmount}
                  dDay={currentDatum.dDay}
                  onRepay={handleRepay}
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
                  onRepay={handleRepay}
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
