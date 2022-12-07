import BoardHeader from '@components/board/BoardHeader';
import styled from '@emotion/styled';
import { Suspense, useState } from 'react';
import BoardSkeleton from '@components/board/BoardSkeleton';
import dynamic from 'next/dynamic';

export default function NurseBoard() {
  const BoardList = dynamic(() => import('@components/board/BoardList'), {
    suspense: true,
    ssr: false,
  });

  const [page, setPage] = useState('1');

  return (
    <BoardContainer>
      <BoardHeader setPage={setPage} page={page} category={'Nurse'} />
      <Suspense fallback={<BoardSkeleton />}>
        <BoardList boardCategory={'nurse'} setPage={setPage} />
      </Suspense>
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
