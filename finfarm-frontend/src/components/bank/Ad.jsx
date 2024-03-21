import adImage from '@/assets/images/adLoan.png';

export default function Ad() {
  return (
    <div className="flex rounded-lg justify-evenly items-center bg-amber-300 w-full">
      <div>
        <div className="mb-10">
          <i className="rounded-sm bg-white text-gray-500 border-solid border-2 border-gray-300 p-1 not-italic">
            광고
          </i>
        </div>
        <div>
          <p className="font-hopang text-5xl mt-50 mb-3">
            초보 농부들을 위한 <br />
            퍼스트 파머론
          </p>
          <span>
            초기 자금이 부족하고 신용이 없는 초보 농부들을 위한 <br />
            상품 금리 10%의 낮은 이율로 누구나 쉽게 대출 가능
          </span>
        </div>
      </div>
      <div>
        <img src={adImage} alt="adImage" />
      </div>
    </div>
  );
}
