import boardApi from '@apis/board';
import BoardList from '@components/Board/BoardList';
import FilterButton from '@components/FilterButton';
import SearchBar from '@components/SearchBar';
import styled from '@emotion/styled';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

/*
  TODO  
  -[O] API 연결 후 테스트
  -[] Pagination - useInfinityquery
  -[] 검색
  -[] 같은 양식으로 의사, 간호사 게시판 만들기
  -[] SSR 적용하기
*/

export default function FreeBoard() {
  const router = useRouter();
  const [sort, setSort] = useState<string | string[] | undefined>(router.query.sort);
  const [page] = useState<string | string[] | undefined>(router.query.page);
  const [perPage] = useState<string | string[] | undefined>(router.query.perPage);

  const { data: res } = useQuery(
    ['board', 'free', sort, page, perPage],
    () => boardApi.getAllFreeBoards({ page, perPage, sort }),
    {
      staleTime: 30000,
      cacheTime: 30000,
    }
  );

  const handleSortClick = (sort: string) => {
    setSort(() => sort);
    router.push({
      query: {
        page,
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
      <Pagination />
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
