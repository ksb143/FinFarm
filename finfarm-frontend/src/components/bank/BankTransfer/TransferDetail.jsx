import PropTypes from 'prop-types';
import profile_icon from '@/assets/images/profile_icon.png';

TransferDetail.propTypes = {
  nickName: PropTypes.string,
  transferDate: PropTypes.instanceOf(Date),
  profileImg: PropTypes.string,
  onClickEvent: PropTypes.func,
  clickClass: PropTypes.string,
};

export default function TransferDetail({
  nickName,
  transferDate,
  profileImg,
  onClickEvent,
  clickClass,
}) {
  const originalDate = new Date(transferDate);
  const newDateString = originalDate.toLocaleDateString('ko-KR');

  return (
    <div
      onClick={onClickEvent}
      className={`flex cursor-pointer items-center justify-between rounded-lg border-2 border-solid border-gray-300 bg-white p-3 ${clickClass}`}
    >
      <div className="flex flex-col">
        <div>{nickName}</div>
        <div className="text-xs text-gray-500">{newDateString}</div>
      </div>
      <div className="avatar">
        <div className="w-16 rounded-full">
          {profileImg ? (
            <img src={profileImg} alt="profile" />
          ) : (
            <img src={profile_icon} alt="profile basic" />
          )}
        </div>
      </div>
    </div>
  );
}
