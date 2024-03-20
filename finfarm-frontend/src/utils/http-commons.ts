import axios, { AxiosInstance } from 'axios';

const { REACT_APP_API_BASE_URL } = import.meta.env;

export default function localAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: REACT_APP_API_BASE_URL,
  });

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.put['Content-Type'] = 'application/json';

  // 요청 인터셉터 (유효한 accessToken 헤더에 추가)
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  // 응답 인터셉터 (서버로부터의 응답을 체크하고, 액세스 토큰이 만료되었을 경우 리프레시 토큰으로 액세스 토큰을 재발급 받는 과정)
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한반복 방지를 위한 플래그 변수

        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${REACT_APP_API_BASE_URL}/members/tokens/reissue`,
          {
            refreshToken,
          },
        );
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
