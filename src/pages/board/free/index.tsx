import boardApi from '@apis/board';
import BoardList from '@components/Board/BoardList';

import Pagination from '@components/Pagination';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import CustomSideBar from '@components/SideBar/CustomSideBar';
import BoardHeader from '@components/Board/BoardHeader';

/*
  TODO  
  -[O] API 연결 후 테스트
  -[O] Pagination - 테스트 완료, 해당 페이지에 Data가 없는 경우 예외 처리
  -[] 검색 - 진행 중
  -[] 같은 양식으로 의사, 간호사 게시판 만들기
  -[] SSR 적용하기
*/

export default function FreeBoard() {
  const router = useRouter();

  const [sort, setSort] = useState('CreatedAt');
  const [page, setPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const { data: res } = useQuery(['board', 'free', sort, page, perPage], () =>
    boardApi.getAllFreeBoards({ page, perPage, sort })
  );

  // 총 페이지 수
  const TOTAL_PAGE = Math.ceil(res?.data.result.count / Number(perPage));

  // Pagination - page
  const handlePageNavigate = (pageNumber: number) => {
    // Page 정렬 기준 설정
    setPage(String(pageNumber + 1));

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page: pageNumber + 1,
        perPage,
        sort,
      },
    });
  };

  // TODO: SideBar 공통 Layout으로 분리, Navbar 위에 덮는 문제 해결
  return (
    <>
      <CustomSideBar />
      <BoardContainer>
        <BoardHeader
          setSort={setSort}
          setPage={setPage}
          setPerPage={setPerPage}
          sort={sort}
          page={page}
          perPage={perPage}
          category="free"
        />
        <BoardList articles={res?.data.result.articles} />
        <Pagination length={TOTAL_PAGE} handler={pageNumber => handlePageNavigate(pageNumber)} />
      </BoardContainer>
    </>
  );
}

const BoardContainer = styled.div`
  width: 900px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;
