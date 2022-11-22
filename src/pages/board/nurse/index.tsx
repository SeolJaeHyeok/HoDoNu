import boardApi from '@apis/board';
import BoardHeader from '@components/board/BoardHeader';
import BoardList from '@components/board/BoardList';
import Pagination from '@components/Pagination';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { searchDataAtom } from '@atoms/searchAtom';
import BoardSkeleton from '@components/board/BoardSkeleton';

export default function NurseBoard() {
  const router = useRouter();

  const [sort, setSort] = useState('createdAt');
  const [page, setPage] = useState('1');
  const [perPage, setPerPage] = useState('5');
  const searchText = useRecoilValue<string>(searchDataAtom);

  const { data: res, isLoading } = useQuery(
    ['board', 'nurse', sort, page, perPage, searchText],
    () => boardApi.getAllNurseBoards({ page, perPage, sort, search: searchText }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
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
  return (
    <BoardContainer>
      <BoardHeader
        setSort={setSort}
        setPage={setPage}
        setPerPage={setPerPage}
        page={page}
        sort={sort}
        perPage={perPage}
        category={res?.data.result.category}
      />
      {!isLoading ? (
        <>
          {res?.data.result.articles.length === 0 && <div>검색 결과가 없습니다.</div>}
          <BoardList
            boardCategory={res?.data.result.category.toLowerCase()}
            articles={res?.data.result.articles}
          />
          <Pagination
            length={TOTAL_PAGE}
            start={router.query.page ? +router.query.page - 1 : 0}
            handler={pageNumber => handlePageNavigate(pageNumber)}
          />
        </>
      ) : (
        <BoardSkeleton />
      )}
    </BoardContainer>
  );
}
const BoardContainer = styled.div`
  width: 900px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;
