interface SearchTagObject {
  [key: string]: string;
}

export const searchFilterTags = ['회사 이름', '내용', '제목'];
export const searchFilterTagsObj: SearchTagObject = {
  ['회사 이름']: 'company',
  ['내용']: 'content',
  ['제목']: 'title',
};
