import { useEffect } from 'react';

import { loginUser } from '@/api/user';

const RedirectPage = () => {
  useEffect(() => {
    // URL에서 인가 코드를 추출합니다.
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      sendCodeToBackend(code);
    } else {
      console.log('인가코드가 없습니다.');
    }
  }, []);
  const sendCodeToBackend = async (code) => {
    console.log(code);
    try {
      const response = await loginUser(code);
      console.log('Success:', response);
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div>
      {/* 로딩 스피너나 메시지를 표시할 수 있습니다. */}
      로그인 처리 중입니다...
    </div>
  );
};

export default RedirectPage;
