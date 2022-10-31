import { setCookie, deleteCookie } from 'cookies-next';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { decodeJWT } from './decodeJWT';
import { isLoginState, userInfoState } from 'src/atoms/userAtom';

export function useUserActions() {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const resetUserInfo = useResetRecoilState(userInfoState);
  const resetIsLogin = useResetRecoilState(isLoginState);

  async function login(userData: any) {
    const { accessToken, refreshToken } = await userData.result;

    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);

    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    const decodedToken = decodeJWT(accessToken);
    const { role, userId, jobCategory }: any = decodedToken;
    setUserInfo({ role, userId, jobCategory });
    setIsLogin(true);
    // 추후 변경 예정
    router.push('/');
  }

  async function logout() {
    resetUserInfo();
    resetIsLogin();
    sessionStorage.clear();
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    // 추후 변경 예정
    router.push('/');
  }

  return {
    login,
    logout,
  };
}

// 로그인 시 refresh token, access token을 http header의 cookie에 저장한다.
// refresh 시  refresh token을 재발급 받는 api를 호출한다. (header에 있는 cookie는 요청시 자동으로 포함된다. )
// return값으로 access token을 발급받으면 유저가 로그인 상태인 거니까 이 값을 boolean 값으로 Myapp에 전달해서 recoilRoot에 initializeState에 넣어준다.
