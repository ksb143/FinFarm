import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import adImage1 from '@/assets/images/adLoan.png';
import adImage2 from '@/assets/images/adSave.png';
import adImage3 from '@/assets/images/adTransfer.png';
import './BankHomePage.css';

import Ad from '@/components/bank/BankHome/Ad';
import SquareButton from '@/components/layout/SquareButton';

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
      tabIndex="0"
    />
  );
}
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
      tabIndex="0"
    />
  );
}

const adData = [
  {
    color: 'bg-amber-300',
    eventType: '광고',
    title: '초보 농부들을 위한 퍼스트 파머론',
    content:
      '초기 자금이 부족하고 신용이 없는 초보 농부들을 위한 상품. 금리 10%의 낮은 이율로 누구나 쉽게 대출 가능',
    adImage: adImage1,
  },
  {
    color: 'bg-cyan-300',
    eventType: '광고',
    title: '핀팜닷컴통장',
    content: '통장실물을 사용하지 않는 인터넷 전용 통장',
    adImage: adImage2,
  },
  {
    color: 'bg-red-300',
    eventType: '이벤트',
    title: '이체 수수료 면제 무제한',
    content:
      '친구의 계좌번호만 안다면 계좌이체 수수료 면제 혜택이 2024.03.01일부터 제공됩니다',
    adImage: adImage3,
  },
];

export default function BankHomePage() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // 광고 아이템
  const adItems = adData.map((ad, index) => (
    <div key={index}>
      <Ad
        eventType={ad.eventType}
        color={ad.color}
        title={ad.title}
        content={ad.content}
        adImage={ad.adImage}
      />
    </div>
  ));

  return (
    <>
      <div className="slider-container mb-10">
        <Slider {...settings}>{adItems}</Slider>
      </div>
      <div className="mx-[-8rem] flex justify-center gap-5 bg-lime-100 py-5">
        <Link to="/bank/account">
          <SquareButton>조회</SquareButton>
        </Link>
        <SquareButton>입출금</SquareButton>
        <Link to="/bank/transfer">
          <SquareButton>이체</SquareButton>
        </Link>
        <SquareButton>대출</SquareButton>
      </div>
    </>
  );
}
