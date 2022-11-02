import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';

export default function RecruitHeader() {
  return (
    <>
      <HeaderTitle>채용 목록</HeaderTitle>
      <FormControl>
        <InputLabel id="perpage-label"></InputLabel>
        <Select
          sx={{
            height: '30px',
            width: '150px',
          }}
          labelId="perpage-label"
        >
          <MenuItem value={'전체 보기'}>전체 보기</MenuItem>
          <MenuItem value={'회사 이름'}>회사 이름</MenuItem>
          <MenuItem value={'자격 요건'}>자격 요건</MenuItem>
          <MenuItem value={'태그'}>태그</MenuItem>
          <MenuItem value={'우대 사항'}>우대 사항</MenuItem>
          <MenuItem value={'타이틀'}>타이틀</MenuItem>
          <MenuItem value={'직업'}>직업</MenuItem>
        </Select>
      </FormControl>
      <RegisetButtonContainer>
        <Button variant="outlined" sx={{ lineHeight: '1.3' }}>
          공고 등록
        </Button>
      </RegisetButtonContainer>
    </>
  );
}

const HeaderTitle = styled.h1`
  font-size: 25px;
  padding-top: 3px;
  margin-right: 30px;
`;

const RegisetButtonContainer = styled.div`
  margin: auto 0 0 auto;
`;
