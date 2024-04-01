import { localAxios } from '@/utils/http-common';

const local = localAxios();

// 마이페이지 프로필 사진 변경
async function changeProfileImage(profileImage) {
  try {
    const response = await local.put('/member/profile', {});
    console.log(response.data.isSuccess);
    return response.data.isSuccess;
  } catch (error) {
    console.log('프로필 사진 저장', error);
    throw error;
  }
}

// 회원 탈퇴
async function membershipWithdrawal() {
  try {
    const response = await local.put('/member/quit', {});
    console.log(response.data.isSuccess);
    return response.data.isSuccess;
  } catch (error) {
    console.log('회원탈퇴 실패', error);
    throw error;
  }
}

export { changeProfileImage, membershipWithdrawal };
