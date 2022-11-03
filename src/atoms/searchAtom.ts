// import { ArticleProps } from '@interfaces/article';
import { ArticleProps } from '@interfaces/article';
import { atom } from 'recoil';

export const searchDataAtom = atom<ArticleProps[]>({
  default: [],
  key: 'searchDataAtom',
});
