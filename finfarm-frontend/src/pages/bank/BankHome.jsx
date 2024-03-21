import './BankHome.css';

import Ad from '@/components/bank/Ad';
import SquareButton from '@/components/layout/SquareButton';

export default function BankHome() {
  return (
    <>
      <div className="carousel w-full mb-5">
        <div id="slide1" className="carousel-item relative w-full">
          <Ad></Ad>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Ad></Ad>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Ad></Ad>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <Ad className="w-full"></Ad>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 bg-lime-100 py-5 mx-[-8rem]">
        <SquareButton>조회</SquareButton>
        <SquareButton>입출금</SquareButton>
        <SquareButton>이체</SquareButton>
        <SquareButton>대출</SquareButton>
      </div>
    </>
  );
}
