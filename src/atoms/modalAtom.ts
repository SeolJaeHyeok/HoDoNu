import { atomFamily } from 'recoil';

export const modalFamilyState = atomFamily({
  key: 'modalState',
  default: false,
});
