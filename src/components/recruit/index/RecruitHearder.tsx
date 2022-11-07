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
}

export default function RecruitHeader({ tagsId, setJobLists }: RecruitHeaderProps) {
  return (
    <>
      <HeaderTitle>채용 목록</HeaderTitle>
      <RecruitHeaderSelect tagsId={tagsId} setJobLists={setJobLists} />
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
