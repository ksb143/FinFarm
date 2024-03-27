import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CurrentLoan from '@/components/bank/BankLoan/CurrentLoan';
import LoanHistory from '@/components/bank/BankLoan/LoanHistory';

export default function BankLoanHistoryPage() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
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
  };
  const currentLoanData = [
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 30000000,
      repayAmount: 33000000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      dDay: 32,
      isRepay: true,
    },
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 300000,
      repayAmount: 33000000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      dDay: 32,
      isRepay: true,
    },
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 30000000,
      repayAmount: 33000000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      dDay: 32,
      isRepay: true,
    },
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 30000000,
      repayAmount: 33000000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      dDay: 32,
      isRepay: true,
    },
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 30000000,
      repayAmount: 30000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      dDay: 32,
      isRepay: true,
    },
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 30000000,
      repayAmount: 330000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      dDay: 32,
      isRepay: true,
    },
  ];

  const loanHistories = [
    {
      pk: 0,
      name: '퍼스트 파머론',
      interest: 10,
      period: 32,
      amount: 30000000,
      repayAmount: 33000000,
      startDate: new Date('March 17, 2024 03:24:00'),
      endDate: new Date('April 03 , 2024 03:24:00'),
      isRepay: true,
    },
  ];

  return (
    <div className="mx-24">
      <div className="m">
        <h1 className="mb-5 text-2xl">대출 현황</h1>
        <div>
          <span className="mr-16">총 상환 금액</span>
          <span>총 {}</span>
        </div>
        <div>
          <span className="mr-16">총 대출 금액</span>
          <span>총 {}</span>
        </div>
        <Slider {...settings}>
          {currentLoanData.map((currentDatum, idx) => (
            <div className="mt-8 flex flex-wrap justify-center gap-5" key={idx}>
              <CurrentLoan
                name={currentDatum.name}
                interest={currentDatum.interest}
                startDate={currentDatum.startDate}
                endDate={currentDatum.endDate}
                amount={currentDatum.amount}
                repayAmount={currentDatum.repayAmount}
                dDay={currentDatum.dDay}
              />
            </div>
          ))}
        </Slider>
      </div>
      <LoanHistory data={loanHistories} recordsView={15}></LoanHistory>
    </div>
  );
}
