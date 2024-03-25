import { localAxios } from '@/utils/http-common';

async function loginUser(accessToken) {
  try {
    const response = await localAxios().post('/members/login', {
      accessToken,
    });

    const { accessToken: newAccessToken } = response.data;

    // 받은 토큰과 사용자 정보를 로컬 스토리지에 저장
    localStorage.setItem('accessToken', newAccessToken);
  } catch (error) {
    console.log('로그인 실패:', error);
  }
}

export { loginUser };
