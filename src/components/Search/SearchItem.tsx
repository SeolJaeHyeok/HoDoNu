/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';
import { highlightIncludedText } from '@utils/highlightText';

const SearchItem = ({ result, searchText, isFocus }: any) => {
  return <Item isFocus={isFocus}>{highlightIncludedText(result.title, searchText)}</Item>;
};

const Item = styled.div<{ isFocus: boolean }>`
  padding: 6px 0;
  font-size: 14px;
  background-color: ${({ isFocus }: any) => (isFocus ? '#ddf1ff' : 'white')};
`;

export default SearchItem;
