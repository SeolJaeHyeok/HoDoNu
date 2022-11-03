import Carousel from '@components/MainCarousel';
import styled from '@emotion/styled';

interface ImageProps {
  images: string[];
}

export default function ImageCarousel(props: ImageProps) {
  const settings = {
    autoplay: false,
    dots: true,
  };
  return (
    <MainCarouselContainer>
      <Carousel settings={settings}>
        {props.images.map(img => {
          return <CarouselImage src={img} key={img} />;
        })}
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
