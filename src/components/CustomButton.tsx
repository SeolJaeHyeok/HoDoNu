import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'text' | 'outlined' | 'contained' | undefined;
  disabled?: boolean;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  bgColor?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  fullSize?: boolean;
  onClick?: () => void;
}

/**
 * @param {string} type - 버튼 스타일 타입, 기본값 'text'
 * @param {boolean} disabled - 활성화 여부
 * @param {number=} width - 버튼 가로 크기
 * @param {number=} height - 버튼 세로 크기
 * @param {string} fontSize - 버튼 글자 크기
 * @param {string} color - 버튼 글자 색깔
 * @param {string} bgColor - 버튼 배경 색깔
 * @param {string} hoverColor - hover할 때 버튼 글자 색깔
 * @param {string} hoverBgColor - hover할 때 버튼 배경 색깔
 * @param {boolean} fullSize - 부모의 width만큼 버튼 채우기
 * @param {() => void} handleClick - 버튼을 클릭했을 때 실행할 함수
 */

export default function CustomButton({
  children,
  type,
  disabled,
  width,
  height,
  fontSize,
  color,
  bgColor,
  hoverColor,
  hoverBgColor,
  fullSize,
  onClick,
}: ButtonProps) {
  return (
    <Button
      sx={{
        width: fullSize ? '100%' : width,
        height: fullSize ? '100%' : height,
        backgroundColor: bgColor,
        fontSize: `${fontSize}px`,
        color,
        ':hover': {
          color: hoverColor,
          backgroundColor: hoverBgColor,
        },
      }}
      disabled={disabled}
      variant={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
