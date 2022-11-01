import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const defaultProps = {
  length: 10,
  show: 5,
  start: 0,
};

type PaginationProps = {
  length?: number;
  show?: number;
  start?: number;
  // eslint-disable-next-line no-unused-vars
  handler: (pageNumber: number) => void;
} & typeof defaultProps;

export default function Pagination({ length, show, start, handler }: PaginationProps) {
  const initArray = Array.from({ length }, (_, i) => i);
  const [pageKey, setPageKey] = useState(start);

  useEffect(() => {
    setPageKey(start);
  }, [start]);

  // 버튼(Card) 클릭 시 페이지 상태관리 및 props의 handler(maybe routing) 실행
  const numberingHandler = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < length) {
      setPageKey(pageNumber);
      handler(pageNumber);
    }
  };

  return (
    <Container>
      <CardContainer>
        {/* 맨 앞으로 */}
        <Card
          disable={pageKey === 0}
          onClick={() => {
            if (pageKey > 0) numberingHandler(0);
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Card>
        {/* 한 페이지 앞 */}
        <Card
          disable={pageKey === 0}
          onClick={() => {
            numberingHandler(pageKey - 1);
          }}
        >
          <KeyboardArrowLeftIcon />
        </Card>
      </CardContainer>
      <CardContainer>
        {/* show 단위 이동 */}
        {pageKey >= show && (
          <Card
            onClick={() => {
              numberingHandler((Math.floor(pageKey / show) - 1) * show);
            }}
          >
            ...
          </Card>
        )}
        {/* 직접 이동 */}
        {initArray
          .slice(Math.floor(pageKey / show) * show, Math.floor(pageKey / show) * show + show)
          .map(page => (
            <Card
              key={page}
              selected={page === pageKey}
              onClick={() => {
                numberingHandler(page);
              }}
            >
              {page + 1}
            </Card>
          ))}
        {/* show 단위 이동 */}
        {pageKey < Math.floor(length / show) * show - (length % show ? 0 : show) && (
          <Card
            onClick={() => {
              numberingHandler((Math.floor(pageKey / show) + 1) * show);
            }}
          >
            ...
          </Card>
        )}
      </CardContainer>
      <CardContainer>
        {/* 한 페이지 뒤 */}
        <Card
          disable={pageKey === length - 1}
          onClick={() => {
            numberingHandler(pageKey + 1);
          }}
        >
          <KeyboardArrowRightIcon />
        </Card>
        {/* 맨 뒤로 */}
        <Card
          disable={pageKey === length - 1}
          onClick={() => {
            if (pageKey < length - 1) numberingHandler(length - 1);
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </Card>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const CardContainer = styled.div`
  display: inline-flex;
  margin-right: 1rem;
  border-left: 1px solid '#DEE2E6';
`;

const Card = styled.div<{ selected?: boolean; disable?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 2.4rem;
  cursor: ${({ disable }) => !disable && 'pointer'};

  color: ${({ selected, disable }) => {
    if (disable) {
      return '#DEE2E6';
    }
    return selected ? 'white' : '#747474';
  }};

  background-color: ${({ selected }) => selected && '#20BBFF'};
  border-top: 1px solid '#DEE2E6';
  border-right: 1px solid '#DEE2E6';
  border-bottom: 1px solid '#DEE2E6';
  &:hover {
    background-color: ${({ selected, disable }) => !disable && !selected && '#20BBFF'};
  }
`;

Pagination.defaultProps = defaultProps;
