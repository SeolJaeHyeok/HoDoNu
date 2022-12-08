import BoardHeader from '@components/board/BoardHeader';
import styled from '@emotion/styled';
import { useState } from 'react';
import BoardSkeleton from '@components/board/BoardSkeleton';
import SSRSafeSuspense from '@components/SSRSafeSuspense';
import BoardList from '@components/board/BoardList';

export default function NurseBoard() {
  const [page, setPage] = useState('1');

  return (
    <BoardContainer>
      <BoardHeader setPage={setPage} page={page} category={'Nurse'} />
      <SSRSafeSuspense fallback={<BoardSkeleton />}>
        <BoardList boardCategory={'nurse'} />
      </SSRSafeSuspense>
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 320px;
  }
`;
