import { decodeJWT, makeProfileUrl } from './../utils/func';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { isLoginState, profileUrl, userInfoState } from 'src/atoms/userAtom';
import { deleteCookie, setCookie } from 'cookies-next';
import { instance } from '@apis/index';

/**
 * 유저 로그인시
 * accessToken은 res body, refresh token은 res header cookie에 있다.
 * setCookie로 refresh token을 cookie에 저장한다.
 * accessToken은 axios header에만 상수로 저장한다.
 * 단 axios header는 refresh할 경우 사라지므로 initialProps에서 다시 저장해
 *
 * access token 만료시
 * accessToken이 만료되었다는 JWTError가 response로 들어오면
 * interceptor가 accesstoken 재발급을 요청
 * 재발급 받은 accesstoken을 axios header에 저장
 *
 * refresh token 만료시
 * 로그아웃!!
 */

export function useUserActions() {
  const router = useRouter();

  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfieUrl = useSetRecoilState(profileUrl);

  const resetUserInfo = useResetRecoilState(userInfoState);
  const resetIsLogin = useResetRecoilState(isLoginState);
  const resetProfileUrl = useResetRecoilState(profileUrl);

  async function login(userData: any) {
    const { accessToken, refreshToken, imgUrl } = await userData.result;
    const profileUrlWithoutS3 = makeProfileUrl(imgUrl);
    const decodedToken = await decodeJWT(accessToken);
    const { role, userId, jobCategory, authStatus, recruiterStatus }: any = decodedToken;

    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    setCookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    setCookie('userId', userId, {
      path: '/',
      sameSite: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    setUserInfo({ role, userId, jobCategory, authStatus, recruiterStatus });
    setProfieUrl(profileUrlWithoutS3);
    setIsLogin(true);
    router.push('/home');
  }

  async function logout() {
    resetUserInfo();
    resetIsLogin();
    resetProfileUrl();
    sessionStorage.clear();
    localStorage.clear();
    instance.defaults.headers.common.Authorization = '';

    deleteCookie('refreshToken');
    deleteCookie('userId');
    deleteCookie('role');
    router.push('/home');
  }

  return {
    login,
    logout,
  };
}
