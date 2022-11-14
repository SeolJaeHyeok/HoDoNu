import boardApi from '@apis/board';
import BoardHeader from '@components/Board/BoardHeader';
import BoardList from '@components/Board/BoardList';
import BoardSkeleton from '@components/Board/BoardSkeleton';
import Pagination from '@components/Pagination';
import CustomSideBar from '@components/SideBar/CustomSideBar';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@atoms/sidebarAtom';

export default function NurseBoard() {
  const router = useRouter();

  const [sort, setSort] = useState('createdAt');
  const [page, setPage] = useState('1');
  const [perPage, setPerPage] = useState('5');
  const [isSidebarOpen, setIsSideBarOpen] = useRecoilState(sidebarAtom);

  const { data: res } = useQuery(['board', 'nurse', sort, page, perPage], () =>
    boardApi.getAllNurseBoards({ page, perPage, sort })
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
    <>
      <CustomSideBar isOpen={isSidebarOpen} setIsOpen={setIsSideBarOpen} />
      <BoardContainer>
        {!res ? (
          <BoardSkeleton />
        ) : (
          <>
            <BoardHeader
              setSort={setSort}
              setPage={setPage}
              setPerPage={setPerPage}
              sort={sort}
              page={page}
              perPage={perPage}
              category={res?.data.result.category.toLowerCase()}
            />

            <BoardList
              boardCategory={res.data.result.category.toLowerCase()}
              articles={res.data.result.articles}
            />
          </>
        )}
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
