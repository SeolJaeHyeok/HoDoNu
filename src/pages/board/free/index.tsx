import boardApi from '@apis/board';
import BoardList from '@components/Board/BoardList';
import FilterButton from '@components/FilterButton';
import SearchBar from '@components/SearchBar';
import Pagination from '@components/Pagination';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

/*
  TODO  
  -[O] API 연결 후 테스트
  -[O] Pagination - 데이터 담아서 테스트 필요, perPage 설정 필요
  -[] 검색
  -[] 같은 양식으로 의사, 간호사 게시판 만들기
  -[] SSR 적용하기
*/

export default function FreeBoard() {
  const router = useRouter();
  const [sort, setSort] = useState<string | string[] | undefined>(router.query.sort);
  const [page, setPage] = useState<string | string[] | undefined>(router.query.page);
  const [perPage] = useState<string | string[] | undefined>(router.query.perPage);

  const { data: res } = useQuery(['board', 'free', sort, page, perPage], () =>
    boardApi.getAllFreeBoards({ page, perPage, sort })
  );

  const handleSortClick = (sort: string) => {
    // Sort 정렬 기준 설정
    setSort(() => sort);

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page,
        perPage,
        sort,
      },
    });
  };

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

  return (
    <BoardContainer>
      <BoardHeader>
        <SearchBar width={200} height={30} />
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
      </BoardHeader>
      <BoardList articles={res?.data.result.articles} />
      <Pagination
        length={Math.ceil(res?.data.result.articles.length / Number(perPage))}
        handler={pageNumber => handlePageNavigate(pageNumber)}
      />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
