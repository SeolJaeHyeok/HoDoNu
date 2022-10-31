import { UserInfo } from 'src/interfaces/user/userInfo';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<UserInfo | null>({
  key: 'userInfo',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
