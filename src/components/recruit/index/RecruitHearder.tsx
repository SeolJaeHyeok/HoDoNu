import styled from '@emotion/styled';
import { JobList } from '@interfaces/recruit/list/list';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import RecruitHeaderSelect from './RecruitHeaderSelect';

export interface RecruitHeaderProps {
  tagsId: {
    tagIds: number[];
  };
  setJobLists: Dispatch<SetStateAction<JobList[]>>;
  searchFilterTagNames: any;
  setSearchFilterTagNames: any;
  setSearchBarFilterInput: any;
  searchBarFilterInput: any;
}

export default function RecruitHeader({
  tagsId,
  setJobLists,
  searchFilterTagNames,
  setSearchFilterTagNames,
  setSearchBarFilterInput,
  searchBarFilterInput,
}: RecruitHeaderProps) {
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
        <Button variant="outlined" sx={{ lineHeight: '3.0', marginBottom: '8px' }}>
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
