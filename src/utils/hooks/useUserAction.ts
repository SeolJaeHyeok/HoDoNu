import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { decodeJWT } from '../decodeJWT';
import { isLoginState, userInfoState } from 'src/atoms/userAtom';

export function useUserActions() {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const resetUserInfo = useResetRecoilState(userInfoState);
  const resetIsLogin = useResetRecoilState(isLoginState);

  async function login(userData: any) {
    const { accessToken, refreshToken } = await userData.result;

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

    // 추후 변경 예정
    router.push('/');
  }

  return {
    login,
    logout,
  };
}
