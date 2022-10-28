import boardApi from '@apis/board';
import BoardList from '@components/Board/BoardList';
import FilterButton from '@components/FilterButton';
import Pagination from '@components/Pagination';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Search from '@components/Search/Search';

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
  const [sort, setSort] = useState<string | string[] | undefined>('CreatedAt');
  const [page, setPage] = useState<string | string[] | undefined>('1');
  const [perPage, setPerPage] = useState<string | string[] | undefined>('10');

  const { data: res } = useQuery(
    ['board', 'free', sort, page, perPage],
    () => boardApi.getAllFreeBoards({ page, perPage, sort }),
    {
      cacheTime: 300000, // 5분간 데이터 캐싱
      staleTime: 300000,
    }
  );

  console.log(res?.data.result.articles);

  // 총 페이지 수
  const TOTAL_PAGE = Math.ceil(res?.data.result.count / Number(perPage));

  // 최신 순, 조회순 정렬
  const handleSortClick = (sort: string) => {
    // Sort 정렬 기준 설정
    setSort(() => sort);
    setPage('1');

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page,
        perPage,
        sort,
      },
    });
  };

  // Pagination - page
  const handlePageNavigate = (pageNumber: number) => {
    // Page 정렬 기준 설정
    setPage(() => String(pageNumber + 1));

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page: pageNumber + 1,
        perPage,
        sort,
      },
    });
  };

  // 모아보기 - perPage
  const handlePerPage = (e: any) => {
    // Per Page 정렬 기준 설정
    setPerPage(() => e.target.value);
    setPage('1');

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page,
        perPage: e.target.value,
        sort,
      },
    });
  };

  return (
    <BoardContainer>
      <BoardHeader>
        <div>
          <FilterButton
            value={'최신순'}
            clicked={router.query.sort === 'CreatedAt'}
            onClick={() => handleSortClick('CreatedAt')}
          />
          <FilterButton
            value={'조회순'}
            clicked={router.query.sort === 'Hits'}
            onClick={() => handleSortClick('Hits')}
          />
        </div>
        <Search />
        <FormControl>
          <InputLabel id="perpage-label"></InputLabel>
          <Select
            sx={{
              height: '30px',
              width: '150px',
            }}
            labelId="perpage-label"
            value={perPage}
            onChange={handlePerPage}
          >
            <MenuItem value={5}>5개씩 보기</MenuItem>
            <MenuItem value={10}>10개씩 보기</MenuItem>
            <MenuItem value={20}>20개씩 보기</MenuItem>
          </Select>
        </FormControl>
      </BoardHeader>
      <BoardList articles={res?.data.result.articles} />
      <Pagination length={TOTAL_PAGE} handler={pageNumber => handlePageNavigate(pageNumber)} />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
`;
