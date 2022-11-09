interface SearchTagObject {
  [key: string]: string;
}

export const searchFilterTags = ['회사 이름', '컨텐츠', '타이틀'];
export const searchFilterTagsObj: SearchTagObject = {
  ['회사 이름']: 'company',
  ['컨텐츠']: 'content',
  ['타이틀']: 'title',
};
