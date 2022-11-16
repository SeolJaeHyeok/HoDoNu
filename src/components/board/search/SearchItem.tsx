/* eslint-disable react/display-name */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { highlightIncludedText } from '@utils/highlightText';
import { useRouter } from 'next/router';

const SearchItem = React.forwardRef(({ articleId, result, setIndex, isFocus, query }: any) => {
  const router = useRouter();
  const [isOver, setIsOver] = useState<boolean>(false);

  const handleClick = () => {
    router.push(`/board/free/${articleId}`);
  };

  const handleMouseOver = () => {
    setIsOver(true);
    setIndex(-1);
  };

  return (
    <Item onClick={handleClick} onMouseOver={handleMouseOver} isFocus={isFocus} isOver={isOver}>
      {highlightIncludedText(result.title, query)}
    </Item>
  );
});

const Item = styled.div<{ isFocus: boolean; isOver: boolean }>`
  padding: 6px 0;
  font-size: 14px;
  background-color: ${({ isFocus }: { isFocus: boolean }) => (isFocus ? '#ddf1ff' : 'white')};
  cursor: pointer;
  &:hover {
    background-color: ${({ isOver }: { isOver: boolean }) => (isOver ? '#ddf1ff' : 'white')};
  }
`;

export default SearchItem;
