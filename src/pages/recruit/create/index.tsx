import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import FileUploader from '@components/Recruit/FileUploader';
import { FileProps } from '@interfaces/recruit';
import recruitApi from '@apis/recruit';
import { recruitPostSchema } from '@utils/validationSchema';
import TagsInput from '@components/Recruit/TagsInput';

/**
0. 공고 제목 - companyRecruitmentTitle
1. 회사 이름 - companyName
2. 회사 관련 태그(우리가 제공) - companyTags
3. 회사 소개 - companyIntroduction
4. 주요 업무(ex. 응급실 외과 전문의) - companyRole
5. 자격 요건(ex. 대졸 이상, 경력 2년 이상 등) - companyRequirement
6. 우대 사항(ex. 해외 경험) - companyPreference
7. 병원 주소 - companyAddress({companyPostalCode, companyMainAddress, companyDetailAddress})
8. 등록하기
 */

/**
 * 설립 - 1~3년, 4~9년, 10년 이상
 * 복지 - 복지 포인트 지급, 진료 할인, 건강검진 지원, 교통비 지원, 중식 지원, 석식 지원
 * 연봉 - 상위 5%, 상위 10%, 상위 30%, 업계 평균
 * 진료 과목 - 내과, 외과, 비뇨기과, 성형외과, 치과, 안과 ...
 */

interface RecruitPostProps {
  companyRecruitmentTitle: string;
  companyName: string;
  companyTags: string[];
  companyIntroduction: string;
  companyImages: File[];
  companyRole: string;
  companyRequirement: string;
  companyPreference: string;
  companyAddress: RecruitAddressProps;
  companyRecruiterContact: string;
}

interface RecruitAddressProps {
  postalCode: string;
  mainAddress: string;
  detailAddress: string;
}

interface DaumAddressAPIProps {
  zonecode: string;
  address: string;
}

export default function RecruitCreatePage() {
  const open = useDaumPostcodePopup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruitPostProps>({
    resolver: yupResolver(recruitPostSchema),
  });

  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [addressInfo, setAddressInfo] = useState<RecruitAddressProps>({
    postalCode: '',
    mainAddress: '',
    detailAddress: '',
  }); // 주소 정보 객체

  const [companyPictures, setCompanyPictures] = useState<FileProps[]>([]); // 회사 사진 배열

  // Daum 주소 API Trigger
  const handleClickOpen = () => {
    open({ onComplete: handleComplete });
  };

  // 주소 입력 완료 후 정보 저장
  const handleComplete = (addressData: DaumAddressAPIProps) => {
    setAddressInfo((prev: RecruitAddressProps) => {
      return {
        ...prev,
        postalCode: addressData.zonecode,
        mainAddress: addressData.address,
      };
    });
  };

  // 상세 주소 정보 저장
  const handleDetailAddress = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddressInfo((prev: RecruitAddressProps) => {
      return {
        ...prev,
        detailAddress: e.target.value,
      };
    });
  };

  // Image File Parsing - [{id: 1, file: File}, {id: 2, file: File}] -> FormData [File, File, ...]
  const parseImageFiles = (files: FileProps[]) => {
    return files.map(({ file }: { file: File }) => file);
  };

  // Image Data Array POST
  const postImageArray = async (formData: FormData) => {
    let responseImageArr;
    try {
      responseImageArr = await recruitApi.postImageArray(formData);
    } catch (e: unknown) {
      console.warn(e);
    }

    return responseImageArr;
  };

  // Mapping Recruit Post Body Data
  const mappingRecruitPostData = (
    data: RecruitPostProps,
    addressInfo: RecruitAddressProps,
    companyImages: string[]
  ) => {
    return {
      title: data.companyRecruitmentTitle,
      company: data.companyName,
      address: addressInfo,
      introduction: data.companyIntroduction,
      task: data.companyRole,
      eligibility: data.companyRequirement,
      favor: data.companyPreference,
      tags: data.companyTags,
      images: companyImages,
      recruiterContact: data.companyRecruiterContact,
    };
  };

  // TODO
  // 1. 사진 파일 POST 요청 후 Image link로 이루어진 string[] 받아오기 - File 객체로 이루어진 배열을 Body에 담아서 요청 - O
  // 2. hook-form으로 관리하고 있는 데이터와 주소 데이터, 사진 데이터를 POST 요청 body 데이터 형식에 맞게 가공 - O
  // 3. 가공된 데이터를 가지고 POST 요청
  // 4. 응답 결과에 따라 처리
  const handleRecruitPost = async (formData: RecruitPostProps) => {
    const imageFormData = new FormData();
    let responseImages;

    // Image POST 요청 선 처리
    if (companyPictures.length > 0) {
      const arr = parseImageFiles(companyPictures);

      arr.forEach((_: any, i: number) => {
        imageFormData.append('images', arr[i]);
      });

      const response = await postImageArray(imageFormData);
      responseImages = response?.data.result;
    }

    // POST Data 추출 후 채용 등록 API 호출
    const bodyData = mappingRecruitPostData(formData, addressInfo, responseImages);
    console.log(bodyData);
  };

  return (
    <form onSubmit={handleSubmit(handleRecruitPost)}>
      <RegisterWrapper>
        <RegisterTitle>공고 등록하기</RegisterTitle>
        <RegisterSubTitle>아래 모든 내용을 기입해주세요.</RegisterSubTitle>
        <Label htmlFor="companyRecruitmentTitle">공고 제목</Label>
        <TextField
          {...register('companyRecruitmentTitle')}
          id="recruitmentTitle"
          placeholder="공고 제목을 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
          helperText={<ErrorMsg>{errors.companyRecruitmentTitle?.message}</ErrorMsg>}
        />
        <Label htmlFor="companyName">회사 이름</Label>
        <TextField
          {...register('companyName')}
          id="companyName"
          placeholder="회사 이름을 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
          helperText={<ErrorMsg>{errors.companyName?.message}</ErrorMsg>}
        />
        <Label htmlFor="companyTag">태그</Label>
        <TagsInput tags={tags} setTags={setTags} />
        <Label htmlFor="companyIntroduction">회사 소개</Label>
        <TextField
          {...register('companyIntroduction')}
          id="companyIntro"
          placeholder="회사를 소개해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
          helperText={<ErrorMsg>{errors.companyIntroduction?.message}</ErrorMsg>}
        />
        <Label htmlFor="companyPictures">회사 사진</Label>
        <ImageWarningMsg>✅ 사진은 .jpg .png .jpeg 파일만 가능합니다.</ImageWarningMsg>
        <ImageWarningMsg>✅ 사진 크기는 최대 5mb입니다.</ImageWarningMsg>
        <ImageWarningMsg>✅ 첨부된 사진이 없으면 기본 이미지가 보여집니다.</ImageWarningMsg>
        <FileUploader
          name="Company Picture"
          fileList={companyPictures}
          setFileList={setCompanyPictures}
          multiple
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
          helperText={<ErrorMsg>{errors.companyRole?.message}</ErrorMsg>}
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
          helperText={<ErrorMsg>{errors.companyRequirement?.message}</ErrorMsg>}
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
          helperText={<ErrorMsg>{errors.companyPreference?.message}</ErrorMsg>}
        />
        <Label htmlFor="companyRecruiterContact">연락처</Label>
        <TextField
          {...register('companyRecruiterContact')}
          id="companyRecruiterContact"
          placeholder="채용 담당자의 연락처 또는 이메일을 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
          helperText={<ErrorMsg>{errors.companyPreference?.message}</ErrorMsg>}
        />
        <Label htmlFor="organization">소속 기관 ( 병원 주소 )</Label>
        <PostalCodeContainer>
          <TextField
            id="organization"
            placeholder="우편번호"
            value={addressInfo.postalCode}
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
            value={addressInfo.mainAddress}
            sx={{
              width: '450px',
              mt: '8px',
            }}
          />
          <TextField
            placeholder="상세 주소"
            value={addressInfo.detailAddress}
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

const PostalCodeContainer = styled.div`
  margin-top: 8px;
`;

const AddressContainer = styled.div``;

const ErrorMsg = styled.span`
  display: block;
  margin-top: 8px;
  color: red;
`;

const ImageWarningMsg = styled.h3`
  color: #8692a6;
  margin-top: 5px;
`;
