import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';

const defaultProps = {
  settings: {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  },
};

interface CarouselProps {
  settings?: Object;
  children: React.ReactNode;
}

function Carousel({ children, settings }: CarouselProps) {
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

Carousel.defaultProps = defaultProps;

export default Carousel;
