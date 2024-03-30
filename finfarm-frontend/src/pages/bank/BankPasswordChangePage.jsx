import { useState } from 'react';

import { changePassword as apiChangePassword } from '@/api/bank';

import Modal from '@/components/layout/Modal';
import CheckModal from '@/components/layout/CheckModal';

export default function BankPasswordChangePage() {
  const [originPassword, setOriginPassword] = useState(''); // 기존 비번
  const [changePassword, setChangePassword] = useState(''); // 새 비번
  const [checkPassword, setCheckPassword] = useState(''); // 새 비번 체크
  const [notEntered, setNotEntered] = useState(false); // 입력 폼
  const [notSame, setNotSame] = useState(false); // 일치 여부
  const [modalVisible, setModalVisible] = useState(false); // 모달 유무
  const [checkModalVisible, setCheckModalVisible] = useState(false); // 체크 모달 유무
  const [isSuccessChange, setIsSuccessChange] = useState(true); // 비번 변경 성공

  const inputCheck = () => {
    const isNotEntered = !originPassword || !changePassword || !checkPassword;
    const isNotSame = changePassword !== checkPassword;

    setNotEntered(isNotEntered);
    setNotSame(isNotSame);
  };

  // 비밀번호 변경
  const confirmChangePassword = async () => {
    const passwordInfo = {
      originPassword,
      changePassword,
      checkPassword,
    };
    try {
      const response = await apiChangePassword(passwordInfo);
      setIsSuccessChange(response);
    } catch (error) {
      console.error(error);
    }
    setModalVisible(false);
    setCheckModalVisible(true);
  };
  // 비밀번호 변경 취소
  const cancelChangePassword = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {modalVisible && (
        <Modal
          onConfirm={confirmChangePassword}
          onCancel={cancelChangePassword}
        >
          비밀번호 변경하겠습니까?
        </Modal>
      )}
      {checkModalVisible &&
        (isSuccessChange ? (
          <CheckModal isSuccess={isSuccessChange}>
            비밀번호 변경에 성공했습니다
          </CheckModal>
        ) : (
          <CheckModal isSuccess={isSuccessChange}>
            비밀번호 변경에 실패했습니다
          </CheckModal>
        ))}
      <div className="flex flex-col gap-10 rounded-xl border-2 border-gray-300 p-5">
        <div className="flex w-full items-center justify-center">
          <p className="w-1/3">기존 비밀번호</p>
          <div>
            <label
              className={`input input-bordered flex items-center gap-2 ${notEntered && !originPassword ? 'border-red-500 shadow-md' : ''}`}
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
                type="password"
                className="grow"
                value={originPassword || ''}
                placeholder="기존 비밀번호 4자리"
                maxLength={4}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (regex.test(value)) {
                    setOriginPassword(value);
                  } else if (
                    e.nativeEvent.inputType === 'deleteContentBackward'
                  ) {
                    setOriginPassword(value);
                  }
                }}
              />
            </label>
            {notSame && (
              <div className="label">
                <span className="label-text-alt text-red-600">
                  비밀번호가 일치하지 않습니다
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="w-1/3">신규 비밀번호</p>
          <div>
            <label
              className={`input input-bordered flex items-center gap-2 ${notEntered && !changePassword ? 'border-red-500 shadow-md' : ''}`}
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
                type="password"
                className="grow"
                value={changePassword || ''}
                placeholder="신규 비밀번호 4자리"
                maxLength={4}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (regex.test(value)) {
                    setChangePassword(value);
                  } else if (
                    e.nativeEvent.inputType === 'deleteContentBackward'
                  ) {
                    setChangePassword(value);
                  }
                }}
              />
            </label>
            {notSame && (
              <div className="label">
                <span className="label-text-alt text-red-600">
                  비밀번호가 일치하지 않습니다
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="w-1/3">비밀번호 확인</p>
          <div>
            <label
              className={`input input-bordered flex items-center gap-2 ${notEntered && !checkPassword ? 'border-red-500 shadow-md' : ''}`}
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
                type="password"
                className="grow"
                value={checkPassword || ''}
                placeholder="신규 비밀번호 확인"
                maxLength={4}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (regex.test(value)) {
                    setCheckPassword(value);
                  } else if (
                    e.nativeEvent.inputType === 'deleteContentBackward'
                  ) {
                    setCheckPassword(value);
                  }
                }}
              />
            </label>
            {notSame && (
              <div className="label">
                <span className="label-text-alt text-red-600">
                  비밀번호가 일치하지 않습니다
                </span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={inputCheck}
          className="rounded-lg bg-lime-500 py-3 font-hopang text-lg text-white"
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}
