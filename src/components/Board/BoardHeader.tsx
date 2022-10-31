import Link from 'next/link';
import FilterButton from '@components/FilterButton';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';
import Search from '@components/Search/Search';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

interface BoardHeaderProps {
  setSort: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<string>>;
  setPerPage: Dispatch<SetStateAction<string>>;
  sort: string | undefined;
  page: string | undefined;
  perPage: string | undefined;
  category: string;
}

export default function BoardHeader({
  setSort,
  setPage,
  setPerPage,
  sort,
  page,
  perPage,
  category,
}: BoardHeaderProps) {
  const router = useRouter();

  // 최신 순, 조회순 정렬
  const handleSortClick = (sort: string) => {
    // Sort 정렬 기준 설정
    setSort(sort);
    setPage('1');

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page,
        perPage,
        sort,
      },
    });
  };

  // 모아보기 - perPage
  const handlePerPage = (e: any) => {
    // Per Page 정렬 기준 설정
    setPerPage(e.target.value);
    setPage('1');

    // 해당 값으로 URL 변경
    router.push({
      query: {
        page,
        perPage: e.target.value,
        sort,
      },
    });
  };
  return (
    <BoardHeaderConatiner>
      <div>
        <FilterButton
          value={'최신순'}
          clicked={router.query.sort === 'CreatedAt'}
          onClick={() => handleSortClick('CreatedAt')}
        />
        <FilterButton
          value={'조회순'}
          clicked={router.query.sort === 'Hits'}
          onClick={() => handleSortClick('Hits')}
        />
      </div>
      <FormControl>
        <InputLabel id="perpage-label"></InputLabel>
        <Select
          sx={{
            height: '30px',
            width: '150px',
          }}
          labelId="perpage-label"
          value={perPage}
          onChange={handlePerPage}
        >
          <MenuItem value={5}>5개씩 보기</MenuItem>
          <MenuItem value={10}>10개씩 보기</MenuItem>
          <MenuItem value={20}>20개씩 보기</MenuItem>
        </Select>
      </FormControl>
      <Search category="free" />
      <Link href={`/board/create?category=${category}`}>
        <Button variant="outlined">작성하기</Button>
      </Link>
    </BoardHeaderConatiner>
  );
}

const BoardHeaderConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
`;
