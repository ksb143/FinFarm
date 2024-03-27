import PropTypes from 'prop-types';

import success from '@/assets/images/success.png';
import fail from '@/assets/images/fail.png';

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  imageUrl: PropTypes.string,
  isSuccess: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([null, undefined]),
  ]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null, undefined]),
  ]),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function Modal({
  onConfirm,
  onCancel,
  children,
  imageUrl,
  isSuccess,
  content,
}) {
  return (
    <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-10 overflow-hidden rounded-lg border-2 border-solid border-gray-300 bg-white px-28 py-10">
      <div className="relative w-fit whitespace-nowrap text-center font-nanum text-3xl font-extrabold tracking-[0] text-lime-950">
        {children}
      </div>
      {isSuccess !== null &&
        isSuccess !== undefined &&
        (isSuccess ? (
          <img src={success} alt="success" />
        ) : (
          <img src={fail} alt="fail" />
        ))}
      <div className="relative inline-flex items-center justify-center gap-3">
        {imageUrl && (
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={imageUrl} alt="profile" />
            </div>
          </div>
        )}
        {content !== undefined && content !== null && (
          <div className="relative w-fit whitespace-nowrap text-center font-nanum text-base font-normal text-black">
            {content}
          </div>
        )}
      </div>
      <div className="relative inline-flex items-start gap-3">
        <button
          className="btn min-w-28 rounded-full bg-blue-600 font-hopang text-white opacity-90"
          onClick={onConfirm}
        >
          예
        </button>
        <button
          className="btn min-w-28 rounded-full bg-red-600 font-hopang text-white opacity-90"
          onClick={onCancel}
        >
          아니오
        </button>
      </div>
    </div>
  );
}
