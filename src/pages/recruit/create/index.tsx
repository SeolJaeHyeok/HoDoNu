import styled from '@emotion/styled';
import { Button } from '@mui/material';

/**
1. 회사 이름
2. 회사 관련 태그(우리가 제공? 아니면 입력 받게끔?)
3. 회사 소개 - 최대 100자
4. 주요 업무(ex. 응급실 외과 전문의)
5. 자격 요건(ex. 대졸 이상, 경력 2년 이상 등)
6. 우대 사항(ex. 해외 경험)
7. 병원 주소
8. 등록하기
 */

export default function RecruitCreatePage() {
  return (
    <form>
      <RegisterWrapper>
        <RegisterTitle>공고 등록하기</RegisterTitle>
        <RegisterSubTitle>아래 모든 내용을 기입해주세요.</RegisterSubTitle>
        <Button
          variant="contained"
          sx={{
            width: 450,
            height: 56,
            color: 'white',
          }}
          type="submit"
        >
          등록하기
        </Button>
      </RegisterWrapper>
    </form>
  );
}

const RegisterWrapper = styled.div`
  width: 450px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const RegisterTitle = styled.h3`
  font-size: 24px;
`;

const RegisterSubTitle = styled.p`
  color: #8692a6;
  margin-top: 21px;
`;
