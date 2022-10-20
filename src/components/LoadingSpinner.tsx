import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export default function LoadingSpinner() {
  return <Spinner />;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 25px;
  height: 25px;
  &::after {
    content: ' ';
    display: block;
    width: 25px;
    height: 25px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;
