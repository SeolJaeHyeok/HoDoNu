import styled from '@emotion/styled';

export default function NoSearchResult({ searchQuery }: { searchQuery: string }) {
  return (
    <NoResult>
      {searchQuery}와(과) 일치하는 결과가 존재하지 않습니다.
      <SuggestList>
        제안:
        <SuggestListItem>1. 모든 단어의 철자가 정확한지 확인하세요.</SuggestListItem>
        <SuggestListItem>2. 다른 검색어를 사용해 보세요. </SuggestListItem>
        <SuggestListItem>3. 더 일반적인 검색어를 사용해 보세요.</SuggestListItem>
        <SuggestListItem>4. 키워드 수를 줄여보세요.</SuggestListItem>
      </SuggestList>
    </NoResult>
  );
}
const NoResult = styled.div`
  font-size: 22px;
  font-weight: 500;
  position: absolute;
  top: 35%;
  display: flex;
  flex-direction: column;
`;

const SuggestList = styled.ul`
  margin: 10px 0px;
`;

const SuggestListItem = styled.li`
  font-size: 16px;
  margin: 5px 0px;
`;
