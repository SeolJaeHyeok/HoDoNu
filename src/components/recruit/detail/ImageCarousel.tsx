import Carousel from '@components/MainCarousel';
import styled from '@emotion/styled';

export default function ImageCarousel() {
  const settings = {
    autoplay: false,
    dots: true,
  };
  return (
    <MainCarouselContainer>
      <Carousel settings={settings}>
        <CarouselImage src={'/assets/images/wellcheck.avif'} />
        <CarouselImage src={'/assets/images/wellcheck.avif'} />
      </Carousel>
    </MainCarouselContainer>
  );
}

const CarouselImage = styled.img`
  height: 350px;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
`;

const MainCarouselContainer = styled.div`
  width: 650px;
  margin: 40px auto;
`;
