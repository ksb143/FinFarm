import localAxios from '../utils/http-commons';
import { AxiosResponse, AxiosError } from 'axios';

const local = localAxios();

interface LoginParams {
  email: string; // 바디에 들어갈 이메일 주소
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  solveQuiz: boolean;
  curPoint: number;
  imageUrl: string;
}

interface JoinParams {
  memberEmail: string; //회원 이메일
  memberNickname: string; //회원 닉네임
  memberAccountPassword: string; //계좌 비밀번호
  memberImageUrl: string | null | void; //회원 사진
}

interface SuccessCallback<T> {
  (response: AxiosResponse<T>): void;
}
interface FailCallback {
  (error: AxiosError<{ message: string }>): void;
}
async function userLogin(
  email: string,
  success: SuccessCallback<LoginResponse>,
  fail: FailCallback,
): Promise<void> {
  const params: LoginParams = { email };
  await local.post(`/members/login`, params).then(success).catch(fail);
}

async function userJoin(
  params: JoinParams,
  success: SuccessCallback<{ message: string }>,
  fail: FailCallback,
): Promise<void> {
  await local.post(`/members/sign-up`, params).then(success).catch(fail);
}

export { userLogin, userJoin };
