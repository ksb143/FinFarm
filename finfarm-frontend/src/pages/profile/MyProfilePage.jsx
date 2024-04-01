import { Link } from 'react-router-dom';
import useUserStore from '@/store/userStore';
import React, { useState, useRef } from 'react'; // useState 추가
import profilePlaceholder from '@/assets/images/profile_icon.png'; // 프로필 이미지 경로 확인 필요
import styles from './MyProfilePage.module.css'; // CSS 모듈 경로 확인 필요

function UserProfilePage() {
  // 전역상태관리 import 로직
  const {
    accessToken: accessToken,
    nickname: nickname,
    email: email,
    pointsInthePocket: pointsInthePocket,
    profileImageUrl: profileImageUrl,
    isQuizSolved: isQuizSolved,
    dateOfSignup: dateOfSignup,
    accountPassword: accountPassword,
  } = useUserStore((state) => ({
    accessToken: state.accessToken,
    nickname: state.nickname,
    email: state.email,
    pointsInthePocket: state.pointsInthePocket,
    profileImageUrl: state.profileImageUrl,
    isQuizSolved: state.isQuizSolved,
    dateOfSignup: state.dateOfSignup,
    accountPassword: state.accountPassword,
  }));

  // 사용자 정보 - 실제 데이터로 채워야 합니다
  const userInfo = {
    nickname: nickname,
    joinDate: dateOfSignup,
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

  // useRef를 사용하여 숨겨진 file input에 접근합니다.
  const fileInputRef = useRef(null);

  const handleProfilePictureChange = () => {
    fileInputRef.current.click(); // 실제 file input을 클릭하도록 합니다.
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    // 파일 처리 로직을 여기에 작성하세요.
    console.log(file);
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      // 로그아웃 처리 로직을 여기에 작성하세요.
      console.log('로그아웃');
    }
  };

  const handleAccountDeletion = () => {
    if (window.confirm('정말 회원 탈퇴를 하시겠습니까?')) {
      // 회원 탈퇴 처리 로직을 여기에 작성하세요.
      console.log('회원 탈퇴');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={profileImageUrl || profilePlaceholder}
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
            <h2 className="text-xl font-bold">{userInfo.nickname}</h2>
            <p className="text-gray-600">가입 날짜: {userInfo.joinDate}</p>
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
