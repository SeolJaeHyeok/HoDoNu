import { searchFilterTagsObj } from '@utils/const/searchFilterTags';

const useFilterTagJoinUrl = (searchTagNames: any, searchTagIds: any, searchInput: any) => {
  const searchRequestTagName = searchTagNames
    .map((tag: any) => searchFilterTagsObj[tag] + `=${searchInput}`)
    .join('&');

  const searchRequestTagId = searchTagIds.tagIds.map((tag: number) => `tagIds=${tag}`).join('&');
  const searchRequestURL = searchRequestTagName + `&${searchRequestTagId}`;

  return searchRequestURL;
};

export default useFilterTagJoinUrl;
