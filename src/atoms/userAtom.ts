import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
export interface UserInfo {
  role: string;
  userId: string;
}

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const userInfoState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    role: '',
    userId: '',
  },
  effects_UNSTABLE: [persistAtom],
});
