// import { Link } from 'react-router-dom';
// import { changeProfileImage, membershipWithdrawal } from '@/api/myPage';
// import useUserStore from '@/store/userStore';
// import React, { useState, useRef } from 'react'; // useState 추가
// import profilePlaceholder from '@/assets/images/profile_icon.png'; // 프로필 이미지 경로 확인 필요
// import styles from './MyProfilePage.module.css'; // CSS 모듈 경로 확인 필요

// function UserProfilePage() {
//   // 전역상태관리 import 로직
//   const {
//     accessToken: accessToken,
//     nickname: nickname,
//     email: email,
//     pointsInthePocket: pointsInthePocket,
//     profileImageUrl: profileImageUrl,
//     isQuizSolved: isQuizSolved,
//     dateOfSignup: dateOfSignup,
//     accountPassword: accountPassword,
//   } = useUserStore((state) => ({
//     accessToken: state.accessToken,
//     nickname: state.nickname,
//     email: state.email,
//     pointsInthePocket: state.pointsInthePocket,
//     profileImageUrl: state.profileImageUrl,
//     isQuizSolved: state.isQuizSolved,
//     dateOfSignup: state.dateOfSignup,
//     accountPassword: state.accountPassword,
//   }));

//   // 사용자 정보 - 실제 데이터로 채워야 합니다
//   const userInfo = {
//     nickname: nickname,
//     joinDate: dateOfSignup,
//   };

// // 설정 데이터 - 실제 데이터 구조에 맞게 수정해야 합니다
// const settings = [
//   { name: '효과음', value: 'ON' },
//   { name: '배경음', value: 'ON' },
//   { name: '배경음 조절', value: '50' },
//   // 추가 설정이 있다면 여기에...
// ];

//   // 설정 상태
//   const [soundEffects, setSoundEffects] = useState(true);
//   const [backgroundMusic, setBackgroundMusic] = useState(true);
//   const [musicVolume, setMusicVolume] = useState(50);

// // 설정을 저장하는 함수
// const saveSettings = () => {
//   console.log('설정 저장:', { soundEffects, backgroundMusic, musicVolume });
//   // 여기에 설정을 저장하는 로직을 구현합니다.
// };

//   // useRef를 사용하여 숨겨진 file input에 접근합니다.
//   const fileInputRef = useRef(null);

//   const handleProfilePictureChange = () => {
//     fileInputRef.current.click(); // 실제 file input을 클릭하도록 합니다.
//   };

//   const handleProfilePictureUpload = (event) => {
//     const file = event.target.files[0];
//     // 파일 처리 로직을 여기에 작성하세요.
//     console.log(file);
//   };

//   const handleLogout = () => {
//     if (window.confirm('로그아웃 하시겠습니까?')) {
//       // 로그아웃 처리 로직을 여기에 작성하세요.
//       console.log('로그아웃');
//     }
//   };

//   const handleAccountDeletion = () => {
//     if (window.confirm('정말 회원 탈퇴를 하시겠습니까?')) {
//       // 회원 탈퇴 처리 로직을 여기에 작성하세요.
//       console.log('회원 탈퇴');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
//         <div className="flex items-center">
//           <div className="relative">
//             <img
//               src={profileImageUrl || profilePlaceholder}
//               alt="프로필 이미지"
//               className="h-32 w-32 rounded-full"
//             />
//             <button
//               className="absolute -bottom-2 -right-2 mb-2 mr-2 inline-block rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//               onClick={handleProfilePictureChange}
//             >
//               수정
//             </button>
//             <input
//               ref={fileInputRef}
//               type="file"
//               className="hidden"
//               onChange={handleProfilePictureUpload}
//             />
//           </div>
//           <div className="ml-4">
//             <h2 className="text-xl font-bold">{userInfo.nickname}</h2>
//             <p className="text-gray-600">가입 날짜: {userInfo.joinDate}</p>
//           </div>
//         </div>
//         <div className="flex flex-col items-end justify-center">
//           <button
//             onClick={handleLogout}
//             className="text-blue-500 hover:text-blue-700"
//           >
//             로그아웃
//           </button>
//           <button
//             onClick={handleAccountDeletion}
//             className="mt-2 text-red-500 hover:text-red-700"
//           >
//             회원 탈퇴
//           </button>
//         </div>
//       </div>

//       <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
//         <h3 className="mb-4 text-xl font-bold">환경 설정</h3>
//         <table className="w-full">
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2">효과음</td>
//               <td className="flex items-center justify-end py-2">
//                 <span className="mr-2">{soundEffects ? 'ON' : 'OFF'}</span>
//                 <label className="switch">
//                   <input
//                     type="checkbox"
//                     checked={soundEffects}
//                     onChange={() => setSoundEffects(!soundEffects)}
//                   />
//                   <span className="slider round"></span>
//                 </label>
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2">배경음</td>
//               <td className="flex items-center justify-end py-2">
//                 <span className="mr-2">{backgroundMusic ? 'ON' : 'OFF'}</span>
//                 <label className="switch">
//                   <input
//                     type="checkbox"
//                     checked={backgroundMusic}
//                     onChange={() => setBackgroundMusic(!backgroundMusic)}
//                   />
//                   <span className="slider round"></span>
//                 </label>
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2">배경음 조절</td>
//               <td className="flex items-center justify-end py-2">
//                 <span className="mr-2">0</span>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={musicVolume}
//                   className="slider"
//                   onChange={(e) => setMusicVolume(e.target.value)}
//                 />
//                 <span className="ml-2">{musicVolume}</span>
//                 {/* <span className="ml-4">100</span> */}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <button
//           className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//           onClick={saveSettings}
//         >
//           저장
//         </button>
//       </div>
//     </div>
//   );
// }

// function ProfileImageModal({ show, onClose, onConfirm, imageSrc }) {
//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <div className="modal-content">
//           <img
//             src={imageSrc}
//             alt="Profile Preview"
//             className="profile-preview"
//           />
//           <p>정말 프로필 사진을 수정하시겠습니까?</p>
//           <button onClick={onConfirm}>확인</button>
//           <button onClick={onClose}>취소</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfilePage;

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import profilePlaceholder from '@/assets/images/profile_icon.png';
import { changeProfileImage, membershipWithdrawal } from '@/api/myPage';
import useUserStore from '@/store/userStore';

function ProfileImageModal({ show, onClose, onConfirm, imageSrc }) {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={imageSrc}
          alt="Profile Preview"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <p>정말 프로필 사진을 수정하시겠습니까?</p>
        <div>
          <button onClick={onConfirm} style={{ marginRight: '10px' }}>
            확인
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

function UserProfilePage() {
  const { accessToken, nickname, dateOfSignup, profileImageUrl } = useUserStore(
    (state) => ({
      accessToken: state.accessToken,
      nickname: state.nickname,
      dateOfSignup: state.dateOfSignup,
      profileImageUrl: state.profileImageUrl,
    }),
  );

  // 설정 데이터 - 실제 데이터 구조에 맞게 수정해야 합니다
  const settings = [
    { name: '효과음', value: 'ON' },
    { name: '배경음', value: 'ON' },
    { name: '배경음 조절', value: '50' },
    // 추가 설정이 있다면 여기에...
  ];

  // 설정을 저장하는 함수
  const saveSettings = () => {
    console.log('설정 저장:', { soundEffects, backgroundMusic, musicVolume });
    // 여기에 설정을 저장하는 로직을 구현합니다.
  };

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [musicVolume, setMusicVolume] = useState(50);

  const handleProfilePictureChange = () => {
    fileInputRef.current.click();
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalConfirm = async () => {
    setShowModal(false);
    // 프로필 사진 변경 로직을 여기에 추가
    console.log('프로필 이미지 변경', previewImage);
    // 서버에 변경 요청을 보내는 함수 호출
    // 예: await changeProfileImage(previewImage);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      console.log('로그아웃 처리 로직');
      // 여기에 로그아웃 처리 로직 구현
    }
  };

  const handleAccountDeletion = async () => {
    if (window.confirm('정말 회원 탈퇴를 하시겠습니까?')) {
      console.log('회원 탈퇴 처리 로직');
      // 여기에 회원 탈퇴 처리 로직 구현
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={profileImageUrl || previewImage || profilePlaceholder}
              alt="프로필 이미지"
              className="h-32 w-32 rounded-full"
            />
            <button
              className="absolute -bottom-2 -right-2 mb-2 mr-2 inline-block rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleProfilePictureChange}
            >
              수정
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleProfilePictureUpload}
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{nickname}</h2>
            <p className="text-gray-600">가입 날짜: {dateOfSignup}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <button
            onClick={handleLogout}
            className="text-blue-500 hover:text-blue-700"
          >
            로그아웃
          </button>
          <button
            onClick={handleAccountDeletion}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            회원 탈퇴
          </button>
        </div>
      </div>

      <ProfileImageModal
        show={showModal}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        imageSrc={previewImage}
      />

      <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">환경 설정</h3>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="py-2">효과음</td>
              <td className="flex items-center justify-end py-2">
                <span className="mr-2">{soundEffects ? 'ON' : 'OFF'}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={() => setSoundEffects(!soundEffects)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2">배경음</td>
              <td className="flex items-center justify-end py-2">
                <span className="mr-2">{backgroundMusic ? 'ON' : 'OFF'}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={backgroundMusic}
                    onChange={() => setBackgroundMusic(!backgroundMusic)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2">배경음 조절</td>
              <td className="flex items-center justify-end py-2">
                <span className="mr-2">0</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  className="slider"
                  onChange={(e) => setMusicVolume(e.target.value)}
                />
                <span className="ml-2">{musicVolume}</span>
                {/* <span className="ml-4">100</span> */}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={saveSettings}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default UserProfilePage;
