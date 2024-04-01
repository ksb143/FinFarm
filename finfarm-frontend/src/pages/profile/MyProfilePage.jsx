// import React from 'react';
// import { Link } from 'react-router-dom';
// import profilePlaceholder from '@/assets/images/profile_icon.png'; // 프로필 이미지가 없을 경우 대체할 이미지
// import './MyProfilePage.module.css'; // 추가적인 스타일이 필요하면 CSS 파일을 만들어 import

// function UserProfilePage() {
//   // 사용자 정보와 설정 데이터 - 실제 데이터로 채워야 합니다
//   const userInfo = {
//     nickname: 'UserNickname',
//     joinDate: 'YYYY-MM-DD',
//   };

//   // 가정한 설정 데이터 - 실제 데이터 구조에 맞게 수정해야 합니다
//   const settings = [
//     { name: '효과음', value: 'ON' },
//     { name: '배경음', value: 'ON' },
//     { name: '배경음 조절', value: '50' },
//     // 더 많은 설정이 있을 수 있습니다
//   ];

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
//         <div className="flex items-center">
//           <img
//             src={profilePlaceholder}
//             alt="프로필 이미지"
//             className="mr-4 h-24 w-24 rounded-full"
//           />
//           <div>
//             <h2 className="text-xl font-bold">{userInfo.nickname}</h2>
//             <p className="text-gray-600">가입 날짜: {userInfo.joinDate}</p>
//           </div>
//         </div>
//         <div className="flex flex-col items-end">
//           <Link
//             to="/edit-profile"
//             className="text-blue-500 hover:text-blue-700"
//           >
//             프로필 수정
//           </Link>
//           <Link to="/logout" className="mt-2 text-blue-500 hover:text-blue-700">
//             로그아웃
//           </Link>
//           <Link
//             to="/delete-account"
//             className="mt-2 text-red-500 hover:text-red-700"
//           >
//             회원 탈퇴
//           </Link>
//         </div>
//       </div>

// <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
//   <h3 className="mb-4 text-xl font-bold">환경설정</h3>
//   <table className="w-full">
//     {settings.map((setting, index) => (
//       <tr key={index} className="border-b">
//         <td className="py-2">{setting.name}</td>
//         <td className="py-2">{setting.value}</td>
//         <td className="py-2 text-right">
//           <Link
//             to={`/settings/${setting.name}`}
//             className="text-blue-500 hover:text-blue-700"
//           >
//             변경
//           </Link>
//         </td>
//       </tr>
//     ))}
//   </table>
// </div>
//     </div>
//   );
// }

// export default UserProfilePage;

import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // useState 추가
import profilePlaceholder from '@/assets/images/profile_icon.png'; // 프로필 이미지 경로 확인 필요
import styles from './MyProfilePage.module.css'; // CSS 모듈 경로 확인 필요

function UserProfilePage() {
  // 사용자 정보 - 실제 데이터로 채워야 합니다
  const userInfo = {
    nickname: 'UserNickname',
    joinDate: 'YYYY-MM-DD',
  };

  // 설정 데이터 - 실제 데이터 구조에 맞게 수정해야 합니다
  const settings = [
    { name: '효과음', value: 'ON' },
    { name: '배경음', value: 'ON' },
    { name: '배경음 조절', value: '50' },
    // 추가 설정이 있다면 여기에...
  ];

  // 설정 상태
  const [soundEffects, setSoundEffects] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [musicVolume, setMusicVolume] = useState(50);

  // 설정을 저장하는 함수
  const saveSettings = () => {
    console.log('설정 저장:', { soundEffects, backgroundMusic, musicVolume });
    // 여기에 설정을 저장하는 로직을 구현합니다.
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={profilePlaceholder}
              alt="프로필 이미지"
              className="h-32 w-32 rounded-full" // 이미지 크기 조정
            />
            <Link
              to="/edit-profile"
              className="absolute -bottom-2 -right-2 mb-2 mr-2 inline-block rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              수정
            </Link>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{userInfo.nickname}</h2>
            <p className="text-gray-600">가입 날짜: {userInfo.joinDate}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <Link to="/logout" className="text-blue-500 hover:text-blue-700">
            로그아웃
          </Link>
          <Link
            to="/delete-account"
            className="mt-2 text-red-500 hover:text-red-700"
          >
            회원 탈퇴
          </Link>
        </div>
      </div>

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
