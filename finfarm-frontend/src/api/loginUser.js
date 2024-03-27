import { userAxios } from '@/utils/http-common.js';

async function loginUser(accessToken) {
  try {
    const response = await userAxios().post('/members/login', {
      accessToken,
    });
    return response;
  } catch (error) {
    console.log('로그인 실패:', error);
  }
}

export { loginUser };
