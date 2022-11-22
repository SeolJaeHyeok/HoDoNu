import { makeProfileUrl } from './../utils/func';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { decodeJWT } from '../utils/decodeJWT';
import { isLoginState, profileUrl, userInfoState } from 'src/atoms/userAtom';

export function useUserActions() {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfieUrl = useSetRecoilState(profileUrl);

  const resetUserInfo = useResetRecoilState(userInfoState);
  const resetIsLogin = useResetRecoilState(isLoginState);

  async function login(userData: any) {
    const { accessToken, refreshToken, imgUrl } = await userData.result;
    const profileUrlWithoutS3 = makeProfileUrl(imgUrl);

    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    const decodedToken = decodeJWT(accessToken);

    const { role, userId, jobCategory, authStatus, recruiterStatus }: any = decodedToken;
    setUserInfo({ role, userId, jobCategory, authStatus, recruiterStatus });
    setProfieUrl(profileUrlWithoutS3);
    setIsLogin(true);
    router.push('/home');
  }

  async function logout() {
    resetUserInfo();
    resetIsLogin();
    sessionStorage.clear();
    router.push('/home');
  }

  return {
    login,
    logout,
  };
}
