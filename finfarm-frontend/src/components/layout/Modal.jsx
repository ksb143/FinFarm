import { useState } from 'react';
import PropTypes from 'prop-types';

import profile_icon from '@/assets/images/profile_icon.png';
import success from '@/assets/images/success.png';
import fail from '@/assets/images/fail.png';

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  imageUrl: PropTypes.string,
  isSuccess: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([null, undefined]),
  ]),
  isInput: PropTypes.oneOfType([
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
  isInput,
  content,
}) {
  const [password, setPassword] = useState('');
  return (
    <div className="fixed left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-10 overflow-hidden rounded-lg border-2 border-solid border-gray-300 bg-white px-28 py-10">
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
        <div className="avatar">
          <div className="w-16 rounded-full">
            {imageUrl ? (
              <img src={imageUrl} alt="profile" />
            ) : (
              <img src={profile_icon} alt="profile" />
            )}
          </div>
        </div>
        {content !== undefined && content !== null && (
          <div className="relative w-fit whitespace-pre-wrap text-center text-center font-nanum text-base font-normal text-black">
            {content}
          </div>
        )}
      </div>
      {isInput && (
        <label
          htmlFor="accountPassword"
          className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300 bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="accountPassword"
            type="password"
            className="grow"
            placeholder="계좌 비밀번호 4자리"
            maxLength={4}
            value={password || ''}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[0-9]*$/;
              if (regex.test(value)) {
                setPassword(value);
              } else if (e.nativeEvent.inputType === 'deleteContentBackward') {
                setPassword(value);
              }
            }}
          />
        </label>
      )}
      <div className="relative inline-flex items-start gap-3">
        <button
          className="btn min-w-28 rounded-full bg-blue-600 font-hopang text-white opacity-90"
          onClick={() => (password ? onConfirm(password) : onConfirm())}
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
