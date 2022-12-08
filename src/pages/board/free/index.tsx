import styled from '@emotion/styled';
import React, { Suspense, useState } from 'react';
import BoardHeader from '@components/board/BoardHeader';
import BoardSkeleton from '@components/board/BoardSkeleton';
import BoardList from '@components/board/BoardList';
import SSRSafeSuspense from '@components/SSRSafeSuspense';
// import dynamic from 'next/dynamic';

export default function FreeBoard() {
  // const BoardList = dynamic(() => import('@components/board/BoardList'), {
  //   // suspense: true,
  //   ssr: false,
  //   // loading: () => <BoardSkeleton />,
  // });

  const [page, setPage] = useState('1');

  return (
    <BoardContainer>
      <BoardHeader setPage={setPage} page={page} category={'Free'} />
      <SSRSafeSuspense fallback={<BoardSkeleton />}>
        <BoardList boardCategory={'free'} />
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

// import boardListApi from '@apis/board/list';
// import BoardList from '@components/board/BoardList';

// import Pagination from '@components/Pagination';
// import styled from '@emotion/styled';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// import BoardHeader from '@components/board/BoardHeader';
// import { searchDataAtom } from '@atoms/searchAtom';
// import { useRecoilValue } from 'recoil';
// import BoardSkeleton from '@components/board/BoardSkeleton';
// import { CategoryType } from '@interfaces/board';

// export default function FreeBoard() {
//   const router = useRouter();
//   const searchText = useRecoilValue<string>(searchDataAtom);
//   const [page, setPage] = useState('1');

//   const { data: res, isLoading } = useQuery(
//     ['board', 'free', router.query.sort, router.query.page, router.query.perPage, searchText],
//     () =>
//       boardListApi.getAllFreeBoards({
//         page: router.query.page,
//         perPage: router.query.perPage,
//         sort: router.query.sort,
//         search: searchText,
//       }),
//     {
//       staleTime: Infinity,
//       cacheTime: Infinity,
//     }
//   );

//   // 총 페이지 수
//   const TOTAL_PAGE = res && Math.ceil(res.count / Number(router.query.perPage));

//   // Pagination - page!
//   const handlePageNavigate = (pageNumber: number) => {
//     // Page 정렬 기준 설정
//     setPage(() => String(pageNumber + 1));

//     // 해당 값으로 URL 변경
//     router.push({
//       query: {
//         page: pageNumber + 1,
//         perPage: router.query.perPage,
//         sort: router.query.sort,
//       },
//     });
//   };

//   useEffect(() => {
//     if (
//       router.query.perPage !== '1' &&
//       router.query.perPage !== '5' &&
//       router.query.perPage !== '10'
//     ) {
//       alert('잘못된 접근입니다.');
//       router.push(`${router.pathname}?page=1&perPage=5&sort=createdAt`);
//     }
//   }, [router]);

//   return (
//     res && (
//       <BoardContainer>
//         <BoardHeader setPage={setPage} page={page} category={res.category} />
//         {res.articles.length === 0 && <div>검색 결과가 없습니다.</div>}
//         {!isLoading ? (
//           <>
//             <BoardList
//               boardCategory={res.category.toLowerCase() as CategoryType}
//               articles={res.articles}
//             />
//             <Pagination
//               length={TOTAL_PAGE}
//               start={router.query.page ? +router.query.page - 1 : 0}
//               handler={pageNumber => handlePageNavigate(pageNumber)}
//               show={3}
//             />
//           </>
//         ) : (
//           <BoardSkeleton />
//         )}
//       </BoardContainer>
//     )
//   );
// }

// const BoardContainer = styled.div`
//   width: 850px;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   margin: 0 auto;
//   @media screen and (min-width: 320px) and (max-width: 768px) {
//     width: 320px;
//   }
// `;
