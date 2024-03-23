import React, { useState } from 'react';

import adImage1 from '@/assets/images/adLoan.png';
import './BankHome.css';

import Ad from '@/components/bank/Ad';
import SquareButton from '@/components/layout/SquareButton';

export default function BankHome() {
  // 현재 보여져야 할 캐러셀 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  const adData = [
    {
      color: 'bg-amber-300',
      title: '초보 농부들을 위한 퍼스트 파머론',
      content:
        '초기 자금이 부족하고 신용이 없는 초보 농부들을 위한 상품. 금리 10%의 낮은 이율로 누구나 쉽게 대출 가능',
      adImage: adImage1,
    },
    // {
    //   color: "bg-cyan-300",
    //   title: ,
    //   content: ,
    //   adImage: adImage2
    // },
    // {
    //   color: "bg-red-300",
    //   title: ,
    //   content: ,
    //   adImage: adImage3
    // },
  ];
  const items = [
    <Ad
      color="bg-amber-300"
      eventType="광고"
      title="초보 농부들을 위한 퍼스트 파머론"
      content="초기 자금이 부족하고 신용이 없는 
              초보 농부들을 위한 상품 금리 10%의 낮은 이율로 누구나 쉽게 대출 가능"
      adImage={adImage}
    />,
    <Ad
      color="bg-cyan-300"
      eventType="광고"
      title="초보 농부들을 위한 퍼스트 파머론"
      content="초기 자금이 부족하고 신용이 없는 
            초보 농부들을 위한 상품 금리 10%의 낮은 이율로 누구나 쉽게 대출 가능"
      adImage={adImage}
    />,
    <Ad
      color="bg-red-300"
      eventType="광고"
      title="초보 농부들을 위한 퍼스트 파머론"
      content="초기 자금이 부족하고 신용이 없는 
            초보 농부들을 위한 상품 금리 10%의 낮은 이율로 누구나 쉽게 대출 가능"
      adImage={adImage}
    />,
  ];

  // 이전으로 돌아가기
  const goToPre = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // 이 다음으로 돌아가기
  const goToNext = () => {
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className="carousel-container">
        <button onClick={goToPre}>❮</button>
        <div className="carousel-item">{items[currentIndex]}</div>
        <button onClick={goToNext}>❯</button>
      </div>
      <div className="mx-[-8rem] flex justify-center gap-5 bg-lime-100 py-5">
        <SquareButton>조회</SquareButton>
        <SquareButton>입출금</SquareButton>
        <SquareButton>이체</SquareButton>
        <SquareButton>대출</SquareButton>
      </div>
    </>
  );
}
