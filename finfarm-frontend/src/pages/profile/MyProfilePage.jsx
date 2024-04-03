import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profilePlaceholder from '@/assets/images/profile_icon.png';
import {
  changeProfileImage,
  membershipWithdrawal,
  editMyInfo,
} from '@/api/myPage';
import useUserStore from '@/store/userStore';
import { useSoundSettingsStore } from '@/store/settingStore';
import ProfileImageModal from '@/components/profile/ProfileImageModal';

export default function UserProfilePage() {
  const { nickname, dateOfSignup, profileImageUrl, setProfileImageUrl } =
    useUserStore((state) => ({
      nickname: state.nickname,
      dateOfSignup: state.dateOfSignup,
      profileImageUrl: state.profileImageUrl,
      setProfileImageUrl: state.setProfileImageUrl,
    }));

  const {
    backgroundMusic,
    soundEffects,
    musicVolume,
    toggleBackgroundMusic,
    toggleSoundEffects,
    setMusicVolume,
  } = useSoundSettingsStore();

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigator = useNavigate();

  // 파일 고르는 폴더 열기
  const handleProfilePictureChange = () => {
    fileInputRef.current.click();
  };

  // 프로필 파일 미리 세팅
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setShowModal(true);
      };

      reader.readAsDataURL(file);
      setNewImage(file);
    }
  };

  // 프로필 변경 취소
  const handleModalClose = () => {
    setShowModal(false);
    setNewImage('');
  };

  // 회원 탈퇴
  const handleAccountDeletion = async () => {
    if (window.confirm('정말 회원 탈퇴를 하시겠습니까?')) {
      try {
        await membershipWithdrawal();
        alert('회원 탈퇴되었습니다');
        navigator('/');
      } catch (error) {
        console.error(error);
        alert('회원 탈퇴에 에러가 발생했습니다');
      }
    }
  };

  // 프로필 사진 서버에 등록
  const saveProfile = async () => {
    const formData = new FormData();
    formData.append('file', newImage);
    try {
      const response = await changeProfileImage(formData);
      setNewImageUrl(response);
      setShowModal(false);
      alert('사진이 서버 등록에 성공했습니다');
    } catch (error) {
      console.error(error);
      alert('사진이 서버 등록에 실패했습니다');
      setNewImage('');
      setShowModal(false);
    }
  };

  // 프로필 사진 저장
  const sendProfile = async () => {
    let sendImgUrl = profileImageUrl; // 기존 이미지 미리 저장
    if (newImageUrl) {
      sendImgUrl = newImageUrl;
    }

    try {
      const sendInfo = {
        memberNickname: nickname,
        memberImageUrl: sendImgUrl,
      };
      const response = await editMyInfo(sendInfo);
      setProfileImageUrl(sendImgUrl);
      alert('유저의 프로필 사진이 등록되었습니다');
    } catch (error) {
      console.error(error);
      alert('유저의 프로필 사진 등록되지 않았습니다');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="relative flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
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
            <div className="flex items-center">
              <p className="text-lg">{nickname}</p>
            </div>
            <p className="text-gray-600">가입 날짜: {dateOfSignup}</p>
          </div>
        </div>

        <button
          onClick={handleAccountDeletion}
          className="absolute bottom-3 right-3 mt-2 rounded-full px-3 py-1 text-sm text-red-600 hover:text-red-700"
        >
          회원 탈퇴
        </button>
      </div>
      <button
        onClick={sendProfile}
        className="my-3 w-full rounded-lg bg-lime-300 py-1 hover:bg-lime-950 hover:text-white"
      >
        프로필 등록
      </button>
      <ProfileImageModal
        show={showModal}
        onClose={handleModalClose}
        onConfirm={saveProfile}
        imageSrc={previewImage}
      />
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">환경 설정</h3>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="py-2">효과음</td>
              <td className='py-2" flex items-center justify-end'>
                <label className="swap">
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={toggleSoundEffects}
                  />
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                  </svg>
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                  </svg>
                </label>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2">배경음</td>
              <td className='py-2" flex items-center justify-end'>
                <label className="swap">
                  <input
                    type="checkbox"
                    checked={backgroundMusic}
                    onChange={toggleBackgroundMusic}
                  />
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                  </svg>
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                  </svg>
                </label>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2">배경음 조절</td>
              <td className="flex items-center justify-end py-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={musicVolume}
                  className="range range-success"
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                />
                <span className="ml-4">{musicVolume * 100}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
