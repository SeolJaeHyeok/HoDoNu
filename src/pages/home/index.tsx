import MainBoardList from '@components/main/MainBoardList';
import Carousel from '@components/MainCarousel';
import styled from '@emotion/styled';
import Link from 'next/link';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import MainBoardSkeleton from '@components/main/MainBoardSkeleton';
import queryKeys from '@hooks/query/home/queryKeys';
import { GetArticleData } from '@interfaces/board';
import boardListApi from '@apis/board/list';

const API_PARAMS = { page: '1', perPage: '5' };

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.detail('free'), () =>
    boardListApi.getAllFreeBoards(API_PARAMS)
  );
  await queryClient.prefetchQuery(queryKeys.detail('doctor'), () =>
    boardListApi.getAllDoctorBoards(API_PARAMS)
  );
  await queryClient.prefetchQuery(queryKeys.detail('nurse'), () =>
    boardListApi.getAllNurseBoards(API_PARAMS)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const { data: freeArticles } = useQuery<GetArticleData>(['main', 'board', 'free']);
  const { data: doctorArticles } = useQuery<GetArticleData>(['main', 'board', 'doctor']);
  const { data: nurseArticles } = useQuery<GetArticleData>(['main', 'board', 'nurse']);

  return (
    <>
      <MainCarouselContainer>
        <Carousel>
          <Link href={'#'}>
            <CarouselImage src={'/assets/images/wellcheck.avif'} />
          </Link>
          <Link href={'#'}>
            <CarouselImage src={'/assets/images/wellcheck.avif'} />
          </Link>
          <Link href={'#'}>
            <CarouselImage src={'/assets/images/wellcheck.avif'} />
          </Link>
        </Carousel>
      </MainCarouselContainer>
      <BoardContainer>
        {!freeArticles || !doctorArticles || !nurseArticles ? (
          <MainBoardSkeleton />
        ) : (
          <>
            <MainBoardList category={'자유 게시판'} articles={freeArticles.articles} />
            <MainBoardList category={'의사 게시판'} articles={doctorArticles.articles} />
            <MainBoardList category={'간호사 게시판'} articles={nurseArticles.articles} />
          </>
        )}
      </BoardContainer>
    </>
  );
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 50px 0px;
`;

const MainCarouselContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
`;

const CarouselImage = styled.img`
  height: 400px;
  width: 100%;
  cursor: pointer;
`;
