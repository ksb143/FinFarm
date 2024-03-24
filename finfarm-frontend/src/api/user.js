import { localAxios } from '@/utils/http-common';

async function loginUser(accessToken) {
  try {
    const response = await localAxios().post('/members/login', {
      accessToken,
    });

    const {
      accessToken: newAccessToken,
      refreshToken,
      memberNickname,
      memberSolveQuiz,
      memberCurPoint,
      memberImageUrl,
    } = response.data;

    // 받은 토큰과 사용자 정보를 로컬 스토리지에 저장
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('memberNickname', memberNickname);
    localStorage.setItem('memberSolveQuiz', String(memberSolveQuiz)); // Boolean 값을 String으로 변환
    localStorage.setItem('memberCurPoint', String(memberCurPoint)); // Int 값을 String으로 변환
    localStorage.setItem('memberImageUrl', memberImageUrl);

    console.log('로그인 성공');
  } catch (error) {
    console.log('로그인 실패:', error);
  }
}

export { loginUser };
