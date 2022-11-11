import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import { BoardDataState } from '@pages/admin/board';
import { Dispatch, SetStateAction } from 'react';

interface BoardTableHeaderProps {
  articles: BoardDataState[];
  setCheckItems: Dispatch<SetStateAction<number[]>>;
  checkItems: number[];
}

export default function BoardTableHeader({
  articles,
  setCheckItems,
  checkItems,
}: BoardTableHeaderProps) {
  const handleClickMultipleCheck = (e: any) => {
    if (e.target.checked) {
      const idArray: number[] = [];
      articles.map(el => idArray.push(el.articleId));
      setCheckItems(idArray);
      return;
    }
    setCheckItems([]);
  };

  return (
    <HeaderWrapper>
      <Checkbox
        onClick={handleClickMultipleCheck}
        checked={checkItems.length === articles?.length ? true : false}
      />
      <HeaderId>ID</HeaderId>
      <HeaderTitle>제목</HeaderTitle>
      <HeaderCreate>작성일</HeaderCreate>
      <HeaderUser>작성자</HeaderUser>
      <HeaderHit>조회수</HeaderHit>
      <HeaderDelete>삭제</HeaderDelete>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f8fa;
  margin-top: 12px;
`;

const HeaderId = styled.p`
  width: 140px;
  text-align: center;
`;
const HeaderTitle = styled(HeaderId)`
  width: 215px;
`;
const HeaderCreate = styled(HeaderId)`
  width: 165px;
`;
const HeaderUser = styled(HeaderId)`
  width: 165px;
`;
const HeaderHit = styled(HeaderId)`
  width: 165px;
`;
const HeaderDelete = styled(HeaderId)`
  width: 140px;
`;
