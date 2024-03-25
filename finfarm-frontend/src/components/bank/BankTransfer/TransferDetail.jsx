import PropTypes from 'prop-types';
import adImage3 from '@/assets/images/adTransfer.png';

TransferDetail.propTypes = {
  nickName: PropTypes.string,
  transferDate: PropTypes.instanceOf(Date),
  profileImg: PropTypes.string,
};

export default function TransferDetail() {
  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-solid border-gray-300 bg-white p-3">
      <div className="flex flex-col">
        <div>닉네임</div>
        <div className="text-xs text-gray-500">20.02.01</div>
      </div>
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src={adImage3} alt="profile" />
        </div>
      </div>
    </div>
  );
}
