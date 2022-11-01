import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

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
  const [hospitalAddressNumber, setHospitalAddressNumber] = useState<string>();
  const [hospitalAddress, setHospitalAddress] = useState<string>('');
  const [hospitalAddressDetail, setHospitalAddressDetail] = useState<string>('');
  return (
    <form>
      <RegisterWrapper>
        <RegisterTitle>공고 등록하기</RegisterTitle>
        <RegisterSubTitle>아래 모든 내용을 기입해주세요.</RegisterSubTitle>
        <Label htmlFor="companyName">회사 이름</Label>
        <TextField
          id="companyName"
          placeholder="회사 이름을 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyName">회사 이름</Label>
        <TextField
          id="companyName"
          placeholder="회사 이름을 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyTag">태그</Label>
        <TextField
          id="companyTag"
          placeholder="회사 관련 태그를 넣어주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyIntro">한 줄 소개</Label>
        <TextField
          id="companyIntro"
          placeholder="간단하게 회사를 소개해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyRole">주요 업무</Label>
        <TextField
          id="companyRole"
          placeholder="지원자가 맡게 되는 주요 업무를 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyRequirement">자격 요건</Label>
        <TextField
          id="companyRequirement"
          placeholder="지원 자격 요건을 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyPreference">우대 사항</Label>
        <TextField
          id="companyPreference"
          placeholder="우대 사항을 입력해주세요"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="organization">소속 기관 ( 병원 주소 )</Label>
        <PostalCodeContainer
          style={{
            marginTop: '8px',
          }}
        >
          <TextField
            id="organization"
            placeholder="우편번호"
            value={hospitalAddressNumber}
            sx={{
              width: '225px',
            }}
          />
          <Button
            variant="outlined"
            onClick={() => console.log('주소 검색 하기')}
            sx={{
              width: 225,
              height: 56,
            }}
          >
            주소 검색
          </Button>
        </PostalCodeContainer>
        <AddressContainer>
          <TextField
            placeholder="주소"
            value={hospitalAddress}
            sx={{
              width: '450px',
              mt: '8px',
            }}
          />
          <TextField
            placeholder="상세 주소"
            value={hospitalAddressDetail}
            onChange={e => console.log('상세 주소 : ', e.target.value)}
            sx={{
              width: '450px',
              mt: '8px',
              mb: '10px',
            }}
          />
        </AddressContainer>
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

const Label = styled.label`
  display: block;
  margin-top: 14px;
  font-size: 14px;
`;

const PostalCodeContainer = styled.div``;
const AddressContainer = styled.div``;
