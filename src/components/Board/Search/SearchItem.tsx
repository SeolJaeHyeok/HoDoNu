/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';
import { highlightIncludedText } from '@utils/highlightText';
import { useRouter } from 'next/router';

const SearchItem = React.forwardRef(({ articleId, result, isFocus, query }: any) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/free/${articleId}`);
  };

  return (
    <Item onClick={handleClick} isFocus={isFocus}>
      {highlightIncludedText(result.title, query)}
    </Item>
  );
});

const Item = styled.div<{ isFocus: boolean }>`
  padding: 6px 0;
  font-size: 14px;
  background-color: ${({ isFocus }: any) => (isFocus ? '#ddf1ff' : 'white')};
  cursor: pointer;
`;

export default SearchItem;
