import Link from 'next/link';
import FilterButton from '@components/FilterButton';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useRouter } from 'next/router';
import Search from '@components/board/search/Search';
import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';

interface BoardHeaderProps {
  setPage: Dispatch<SetStateAction<string>>;
  page: string | undefined;
  category: 'Free' | 'Doctor' | 'Nurse';
}

export default function BoardHeader({ setPage, category }: BoardHeaderProps) {
  const router = useRouter();
  const loginInfo = useRecoilValue(userInfoState);

  // 최신 순, 조회순 정렬
  const handleSortClick = (sort: string) => {
    // 해당 값으로 URL 변경
    router.push({
      query: {
        page: '1',
        perPage: router.query.perPage,
        sort,
      },
    });
  };

  // 모아보기 - perPage
  const handlePerPage = (e: SelectChangeEvent<string>) => {
    // 해당 값으로 URL 변경
    router.push({
      query: {
        page: '1',
        perPage: e.target.value,
        sort: router.query.sort,
      },
    });
  };

  return (
    <BoardHeaderConatiner>
      <div>
        <FilterButton
          value={'최신순'}
          clicked={router.query.sort === 'createdAt'}
          onClick={() => handleSortClick('createdAt')}
        />
        <FilterButton
          value={'조회순'}
          clicked={router.query.sort === 'hits' || router.query.sort === 'Hits'}
          onClick={() => handleSortClick('hits')}
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
          value={router.query.perPage as string}
          onChange={handlePerPage}
        >
          <MenuItem value={5}>5개씩 보기</MenuItem>
          <MenuItem value={10}>10개씩 보기</MenuItem>
          <MenuItem value={20}>20개씩 보기</MenuItem>
        </Select>
      </FormControl>
      <Search setPage={setPage} category={category} />
      {loginInfo && (
        <Link href={`/board/create?category=${category}`}>
          <Button variant="outlined">작성하기</Button>
        </Link>
      )}
    </BoardHeaderConatiner>
  );
}

const BoardHeaderConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
  flex-wrap: wrap;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    * {
      margin-bottom: 5px;
    }
  }
`;
