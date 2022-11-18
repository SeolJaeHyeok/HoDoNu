import { userInfoState } from '@atoms/userAtom';
import styled from '@emotion/styled';
import { JobList } from '@interfaces/recruit/list/list';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import RecruitHeaderSelect from './RecruitHeaderSelect';

export interface RecruitHeaderProps {
  tagsId: {
    tagIds: number[];
  };
  setJobLists: Dispatch<SetStateAction<JobList[]>>;
  searchFilterTagNames: string[];
  setSearchFilterTagNames: Dispatch<SetStateAction<string[]>>;
  searchBarFilterInput: string;
  setSearchBarFilterInput: Dispatch<SetStateAction<string>>;
}

export default function RecruitHeader({
  tagsId,
  setJobLists,
  searchFilterTagNames,
  setSearchFilterTagNames,
  setSearchBarFilterInput,
  searchBarFilterInput,
}: RecruitHeaderProps) {
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();

  const handleClickRecruitRegister = () => {
    if (userInfo === null) {
      alert('비회원은 공고등록을 작성할 수 없습니다. 로그인을 진행해주세요!');
      router.push('/login');
      return;
    }
    router.push('/recruit/create');
  };

  return (
    <>
      <HeaderTitle>채용 목록</HeaderTitle>
      <RecruitHeaderSelect
        tagsId={tagsId}
        setJobLists={setJobLists}
        searchFilterTagNames={searchFilterTagNames}
        setSearchFilterTagNames={setSearchFilterTagNames}
        setSearchBarFilterInput={setSearchBarFilterInput}
        searchBarFilterInput={searchBarFilterInput}
      />
      <RegisetButtonContainer>
        <Button
          variant="outlined"
          sx={{ lineHeight: '3.0', marginBottom: '8px' }}
          onClick={handleClickRecruitRegister}
        >
          공고 등록
        </Button>
      </RegisetButtonContainer>
    </>
  );
}

const HeaderTitle = styled.h1`
  font-size: 25px;
  padding-top: 3px;
  margin: auto 0;
  margin-right: 30px;
`;

const RegisetButtonContainer = styled.div`
  margin: auto 0 0 auto;
`;
