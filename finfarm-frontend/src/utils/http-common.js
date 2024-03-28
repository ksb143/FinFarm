import axios from 'axios';

const { VITE_REACT_API_URL } = import.meta.env;

// 회원
const userAxios = axios.create({
  baseURL: VITE_REACT_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

// 로컬
const localAxios = axios.create({
  baseURL: VITE_REACT_API_URL,
  withCredentials: true,
});

localAxios.defaults.headers.common['Authorization'] = '';
localAxios.defaults.headers.post['Content-Type'] = 'application/json';
localAxios.defaults.headers.put['Content-Type'] = 'application/json';

localAxios.interceptors.request.use(
  (config) => {
    // 모든 요청에 대해 Authorization 헤더 설정
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

localAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // UNAUTHORIZED와 토큰 재발급 안했을 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      // 리프레시 토큰이 없으면 바로 에러
      if (!refreshToken) {
        return Promise.reject(error);
      }

      // 토큰 재발급
      try {
        const response = await localAxios.post('/members/tokens/reissue', {
          refreshToken,
        });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localAxios.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        // 기존 요청 다시 실행
        return localAxios(originalRequest);
        // 토큰 재발급 불가
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export { userAxios, localAxios };
