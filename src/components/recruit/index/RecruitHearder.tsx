import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import RecruitHeaderSelect from './RecruitHeaderSelect';
import RecruitSearchBar from './RecruitSearchBar';

export default function RecruitHeader() {
  return (
    <>
      <HeaderTitle>채용 목록</HeaderTitle>
      <RecruitHeaderSelect />
      <RecruitSearchBar />
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
