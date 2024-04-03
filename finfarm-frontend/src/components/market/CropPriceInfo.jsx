import PropTypes from 'prop-types';

CropPriceInfo.propTypes = {
  agricultureName: PropTypes.string,
  agricultureImg: PropTypes.string,
  agricultureContent: PropTypes.string,
  fluctuationPrice: PropTypes.number,
  fluctuationRate: PropTypes.number,
  onClickEvent: PropTypes.func,
};

export default function CropPriceInfo({
  agricultureName,
  agricultureImg,
  agricultureContent,
  fluctuationPrice,
  fluctuationRate,
  onClickEvent,
}) {
  return (
    <div
      onClick={onClickEvent}
      className="mb-6 grid w-full cursor-pointer grid-cols-9 items-center"
    >
      <div className="avatar col-span-2">
        <div className="w-20 rounded-full ring ring-gray-300 ring-offset-2 ring-offset-base-100">
          <img src={agricultureImg} />
        </div>
      </div>
      <div className="col-span-5">
        <p className="text-xl">{agricultureName}</p>
        <p className="text-sm text-gray-500">{agricultureContent}</p>
      </div>
      <div className="col-span-2 text-center">
        {fluctuationRate >= 0 ? (
          <p className="text-xl text-red-600">+{fluctuationRate.toFixed(2)}%</p>
        ) : (
          <p className="text-xl text-blue-600">
            -{Math.abs(fluctuationRate).toFixed(2)}%
          </p>
        )}
        <p className="text-xl">{fluctuationPrice.toLocaleString('ko-KR')}원</p>
      </div>
    </div>
  );
}
