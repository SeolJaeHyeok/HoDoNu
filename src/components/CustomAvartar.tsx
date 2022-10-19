import { Avatar } from '@mui/material';
import React from 'react';

interface AvatarProps {
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

function CustomAvatar({ alt, src, width, height, handleClick }: AvatarProps) {
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

CustomAvatar.defaultProps = {
  src: 'https://placehold.jp/50x50.png',
  width: 50,
  height: 50,
};

export default CustomAvatar;