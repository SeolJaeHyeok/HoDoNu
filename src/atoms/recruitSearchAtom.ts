import { atom } from 'recoil';

export const recruitSearchAtom = atom<string>({
  default: '',
  key: 'recruitSearchAtom',
});
