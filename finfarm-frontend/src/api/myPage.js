import { localAxios, fileAxios } from '@/utils/http-common';

const local = localAxios();
const file = fileAxios();

// 마이페이지 조회
async function getMyInfo() {
  try {
    const response = await local.get('/member/my-page');
    return response.data;
  } catch (error) {
    console.log('마이페이지 조회 실패', error);
    throw error;
  }
}

// 마이페이지 프로필 사진 변경
async function changeProfileImage(profileData) {
  try {
    const response = await local.post('/member/profile', profileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.memberImageUrl;
  } catch (error) {
    console.log('프로필 사진 저장 error', error);
    throw error;
  }
}

// 회원 탈퇴
async function membershipWithdrawal() {
  try {
    const response = await local.delete('/member/quit');
    return response.data;
  } catch (error) {
    console.log('회원탈퇴 실패', error);
    throw error;
  }
}

// 마이페이지 수정
async function editMyInfo(changeInfo) {
  try {
    const response = await local.put('/member/my-page', changeInfo);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('회원 수정 실패', error);
    throw error;
  }
}

export { getMyInfo, changeProfileImage, membershipWithdrawal, editMyInfo };
