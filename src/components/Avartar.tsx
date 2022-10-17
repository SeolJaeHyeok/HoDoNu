import { Avatar } from '@mui/material';
import React from 'react';

interface IAvartar {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * @param {string} alt - 이미지 대체 텍스트
 * @param {string} src - 이미지 src
 * @param {number=} width - 이미지 가로 크기, 기본값 50
 * @param {number=} height - 이미지 세로 크기, 기본값 50
 * @param {() => void} handleClick - 이미지를 클릭했을 때 실행할 함수
 */

function AvartarImage({ alt, src, width, height, handleClick }: IAvartar) {
  return (
    <Avatar
      alt={alt}
      onClick={handleClick}
      src={src}
      sx={{
        width,
        height,
        borderRadius: '50%',
      }}
    />
  );
}

AvartarImage.defaultProps = {
  src: 'http://via.placeholder.com/640x360',
  width: 50,
  height: 50,
};

export default AvartarImage;
