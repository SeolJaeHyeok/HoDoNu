import BoardList from '@components/Main/MainBoardList';
import Carousel from '@components/Main/MainCarousel';
import styled from '@emotion/styled';
import Link from 'next/link';
import boardApi from 'src/apis/board';
import { useQuery } from 'react-query';

export default function Home() {
  const params = { page: 1, perPage: 5 };

  const { data: freeArticles } = useQuery(
    ['article', 'free'],
    () => boardApi.getAllFreeBoards(params),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

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
        <BoardList category={'자유 게시판'} articles={freeArticles?.data.result.articles} />
        <BoardList category={'의사 게시판'} articles={freeArticles?.data.result.articles} />
        <BoardList category={'간호사 게시판'} articles={freeArticles?.data.result.articles} />
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
