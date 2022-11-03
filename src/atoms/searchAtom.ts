import { atom } from 'recoil';

export const searchDataAtom = atom<string>({
  default: '',
  key: 'searchDataAtom',
});
