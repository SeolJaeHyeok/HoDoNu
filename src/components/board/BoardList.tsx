import boardListApi from '@apis/board/list';
import { searchDataAtom } from '@atoms/searchAtom';
import Pagination from '@components/Pagination';
import styled from '@emotion/styled';
import { ArticleProps, CategoryType } from '@interfaces/board';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import BoardListItem from './BoardListItem';

interface BoardProps {
  boardCategory: CategoryType;
  setPage: any;
}

export default function BoardList({ boardCategory, setPage }: BoardProps) {
  const searchText = useRecoilValue<string>(searchDataAtom);
  const router = useRouter();
  const params = {
    page: router.query.page,
    perPage: router.query.perPage,
    sort: router.query.sort,
    search: searchText,
  };
  const { data: res } = useQuery(
    ['board', 'free', router.query.sort, router.query.page, router.query.perPage, searchText],
    () => {
      if (boardCategory === 'free') {
        return boardListApi.getAllFreeBoards(params);
      }
      if (boardCategory === 'doctor') {
        return boardListApi.getAllDoctorBoards(params);
      }

      if (boardCategory === 'nurse') {
        return boardListApi.getAllNurseBoards(params);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  const TOTAL_PAGE = res && Math.ceil(res.count / Number(router.query.perPage));

  // Pagination - page!
  const handlePageNavigate = (pageNumber: number) => {
    // Page 정렬 기준 설정
    setPage(() => String(pageNumber + 1));

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page: pageNumber + 1,
        perPage: router.query.perPage,
        sort: router.query.sort,
      },
    });
  };

  useEffect(() => {
    if (
      router.query.perPage !== '1' &&
      router.query.perPage !== '5' &&
      router.query.perPage !== '10'
    ) {
      alert('잘못된 접근입니다.');
      router.push(`${router.pathname}?page=1&perPage=5&sort=createdAt`);
    }
  }, [router]);

  return (
    <BoardListContainer>
      {res?.articles.map((article: ArticleProps) => (
        <BoardListItem key={article.articleId} boardCategory={boardCategory} {...article} />
      ))}
      <Pagination
        length={TOTAL_PAGE}
        start={router.query.page ? +router.query.page - 1 : 0}
        handler={pageNumber => handlePageNavigate(pageNumber)}
        show={3}
      />
    </BoardListContainer>
  );
}

const BoardListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
