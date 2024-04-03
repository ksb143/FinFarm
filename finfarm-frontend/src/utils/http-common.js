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

// 프로필 사진
function fileAxios() {
  const instance = axios.create({
    baseURL: VITE_REACT_API_URL,
    withCredentials: true,
  });

  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

  instance.interceptors.request.use(
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

  const retryCounts = {}; // 토큰 재발급 플래그 변수

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest.requestId) {
        originalRequest.requestId = Date.now().toString(); // 예: 타임스탬프 사용
      }

      const retryCount = retryCounts[originalRequest.requestId] || 0;
      // UNAUTHORIZED와 토큰 재발급 안했을 경우
      if (error.response.status === 401 && originalRequest._retryCount < 1) {
        retryCounts[originalRequest.requestId] = retryCount + 1;
        const memberEmail = localStorage.getItem('memberEmail');
        try {
          // 토큰 재발급
          const response = await instance.post('/members/tokens/reissue', {
            memberEmail,
          });
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          instance.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          // 기존 요청 다시 실행
          return instance(originalRequest);
        } catch (reissueError) {
          // 토큰 재발급 실패 처리
          console.error('토큰 재발급 요청 실패:', reissueError);
          return Promise.reject(error); // 오류를 그대로 반환하여 처리 종료
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
}

// 로컬
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_REACT_API_URL,
    withCredentials: true,
  });

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.put['Content-Type'] = 'application/json';

  instance.interceptors.request.use(
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

  const retryCounts = {}; // 토큰 재발급 플래그 변수

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest.requestId) {
        originalRequest.requestId = Date.now().toString(); // 예: 타임스탬프 사용
      }

      const retryCount = retryCounts[originalRequest.requestId] || 0;
      // UNAUTHORIZED와 토큰 재발급 안했을 경우
      if (error.response.status === 401 && originalRequest._retryCount < 1) {
        retryCounts[originalRequest.requestId] = retryCount + 1;
        const memberEmail = localStorage.getItem('memberEmail');
        try {
          // 토큰 재발급
          const response = await instance.post('/members/tokens/reissue', {
            memberEmail,
          });
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          instance.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          // 기존 요청 다시 실행
          return instance(originalRequest);
        } catch (reissueError) {
          // 토큰 재발급 실패 처리
          console.error('토큰 재발급 요청 실패:', reissueError);
          return Promise.reject(error); // 오류를 그대로 반환하여 처리 종료
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
}
export { userAxios, localAxios, fileAxios };
