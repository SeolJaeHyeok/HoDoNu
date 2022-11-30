import { UserInfo } from 'src/interfaces/user/userInfo';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

const { persistAtom: localStoragePersistAtom } = recoilPersist({
  storage: localStorage,
});

export const isLoginState = atom<any>({
  key: 'isLogin',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<UserInfo | null>({
  key: 'userInfo',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const profileUrl = atom<string | null>({
  key: 'profileImg',
  default: null,
  effects_UNSTABLE: [localStoragePersistAtom],
});
