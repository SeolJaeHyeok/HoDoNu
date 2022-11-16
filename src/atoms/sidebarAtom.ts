import { atom } from 'recoil';

export const sidebarAtom = atom<boolean>({
  default: false,
  key: 'sidebarAtom',
});
