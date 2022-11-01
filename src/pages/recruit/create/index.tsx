import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDaumPostcodePopup } from 'react-daum-postcode';

/**
1. 회사 이름 - companyName
2. 회사 관련 태그(우리가 제공? 아니면 입력 받게끔?) - companyTags
3. 회사 소개 - 최대 100자 - companyIntro
4. 주요 업무(ex. 응급실 외과 전문의) - companyRole
5. 자격 요건(ex. 대졸 이상, 경력 2년 이상 등) - companyRequirement
6. 우대 사항(ex. 해외 경험) - companyPreference
7. 병원 주소 - companyAddress({companyPostalCode, companyMainAddress, companyDetailAddress})
8. 등록하기
 */

interface RecruitPostProps {
  companyName: string;
  companyTags: string[];
  companyIntro: string;
  companyPictures: File[];
  companyRole: string;
  companyRequirement: string;
  companyPreference: string;
  companyAddress: RecruitAddressProps;
}

interface RecruitAddressProps {
  companyPostalCode: string;
  companyMainAddress: string;
  companyDetailAddress: string;
}

interface DaumAddressAPIProps {
  zonecode: string;
  address: string;
}

const recruitPostSchema = yup.object({
  companyName: yup.string().required('회사 이름을 입력해주세요:('),
  companyTags: yup.string().required('회사 태그를 입력해주세요:('),
  companyIntro: yup
    .string()
    .max(1000, '최대 20글자까지 입력가능합니다!')
    .required('회사 소개를 입력해주세요!'),
  // companyPictures: yup.array().required('회사 태그를 입력해주세요:('),
  companyRole: yup.string().required('주요 업무를 입력해주세요:('),
  companyRequirement: yup.string().required('자격 요건을 입력해주세요:('),
  companyPreference: yup.string().required('우대 사항을 입력해주세요:('),
});

export default function RecruitCreatePage() {
  const open = useDaumPostcodePopup();

  const [addressInfo, setAddressInfo] = useState<RecruitAddressProps>({
    companyPostalCode: '',
    companyMainAddress: '',
    companyDetailAddress: '',
  });
  const { register, handleSubmit } = useForm<RecruitPostProps>({
    resolver: yupResolver(recruitPostSchema),
  });

  const handleClickOpen = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (addressData: DaumAddressAPIProps) => {
    setAddressInfo((prev: RecruitAddressProps) => {
      return {
        ...prev,
        companyPostalCode: addressData.zonecode,
        companyMainAddress: addressData.address,
      };
    });
  };

  const handleDetailAddress = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddressInfo((prev: RecruitAddressProps) => {
      return {
        ...prev,
        companyDetailAddress: e.target.value,
      };
    });
  };

  const onValid = (data: any) => {
    console.log(data);
    console.log(addressInfo);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <RegisterWrapper>
        <RegisterTitle>공고 등록하기</RegisterTitle>
        <RegisterSubTitle>아래 모든 내용을 기입해주세요.</RegisterSubTitle>
        <Label htmlFor="companyName">회사 이름</Label>
        <TextField
          {...register('companyName')}
          id="companyName"
          placeholder="회사 이름을 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />

        <Label htmlFor="companyTag">태그</Label>
        <TextField
          {...register('companyTags')}
          id="companyTag"
          placeholder="회사 관련 태그를 넣어주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyIntro">회사 소개</Label>
        <TextField
          {...register('companyIntro')}
          id="companyIntro"
          placeholder="회사를 소개해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyPictures">회사 사진</Label>
        <TextField
          {...register('companyPictures')}
          id="companyPictures"
          placeholder="회사를 소개할 수 있을만한 사진을 올려주세요!"
          type="file"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyRole">주요 업무</Label>
        <TextField
          {...register('companyRole')}
          id="companyRole"
          placeholder="지원자가 맡게 될 주요 업무를 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyRequirement">자격 요건</Label>
        <TextField
          {...register('companyRequirement')}
          id="companyRequirement"
          placeholder="지원 자격 요건을 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="companyPreference">우대 사항</Label>
        <TextField
          {...register('companyPreference')}
          id="companyPreference"
          placeholder="우대 사항을 입력해주세요:)"
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
            value={addressInfo.companyPostalCode}
            sx={{
              width: '225px',
            }}
          />
          <Button
            variant="outlined"
            onClick={handleClickOpen}
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
            value={addressInfo.companyMainAddress}
            sx={{
              width: '450px',
              mt: '8px',
            }}
          />
          <TextField
            placeholder="상세 주소"
            value={addressInfo.companyDetailAddress}
            onChange={handleDetailAddress}
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
