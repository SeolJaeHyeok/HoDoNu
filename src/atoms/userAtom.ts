import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
export type UserInfo = {
  role: string | null;
  userId: string | null;
};

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
