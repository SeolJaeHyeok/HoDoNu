import Carousel from '@components/MainCarousel';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

interface ImageProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageProps) {
  const settings = {
    autoplay: false,
    dots: true,
  };

  return (
    <Box sx={{ width: { sm: '650px', xs: '320px' }, mt: 5, mb: 2 }}>
      <Carousel settings={settings}>
        {images?.length ? (
          images.map(img => {
            return <CarouselImage src={img} key={img} />;
          })
        ) : (
          <CarouselImage src="/assets/images/wellcheck.avif" />
        )}
      </Carousel>
    </Box>
  );
}

const CarouselImage = styled.img`
  height: 350px;
  width: 100%;
  cursor: pointer;
  border-radius: 12px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    height: 200px;
  }
`;
