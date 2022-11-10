import { atom } from 'recoil';

export const recruitSearchAtom = atom<any>({
  default: {
    tagIds: [],
  },
  key: 'recruitSearchAtom',
});
