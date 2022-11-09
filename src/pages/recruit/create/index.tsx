import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { AddressProps, FileProps } from '@interfaces/recruit';
import recruitApi from '@apis/recruit';
import { recruitPostSchema } from '@utils/validationSchema';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { recruitEditorInitialValue } from '@utils/const/recruitEditorInitialValue';
import { useRouter } from 'next/router';
import FileUploader from '@components/recruit/FileUploader';
import { useMutation } from '@tanstack/react-query';

interface RecruitPostProps {
  companyRecruitmentTitle: string;
  companyName: string;
  companyRecruiterContact: string;
}

interface DaumAddressAPIProps {
  zonecode: string;
  address: string;
}

export default function RecruitCreatePage() {
  const { quill, quillRef } = useQuill();
  const open = useDaumPostcodePopup();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruitPostProps>({
    resolver: yupResolver(recruitPostSchema),
  });

  const [addressInfo, setAddressInfo] = useState<AddressProps>({
    postalCode: '',
    mainAddress: '',
    detailAddress: '',
  }); // 주소 정보 객체

  const [companyPictures, setCompanyPictures] = useState<FileProps[]>([]); // 회사 사진 배열

  // Daum 주소 API Trigger
  const handleClickOpen = () => {
    open({ onComplete: handleComplete });
  };

  const { mutate: postMutate } = useMutation(recruitApi.postRecruit, {
    onSuccess: (data: any) => {
      const {
        data: {
          result: { jobId },
        },
      } = data;
      router.push(`/recruit/create/${jobId}`);
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  // 주소 입력 완료 후 정보 저장
  const handleComplete = (addressData: DaumAddressAPIProps) => {
    setAddressInfo((prev: AddressProps) => {
      return {
        ...prev,
        postalCode: addressData.zonecode,
        mainAddress: addressData.address,
      };
    });
  };

  // 상세 주소 정보 저장
  const handleDetailAddress = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddressInfo((prev: AddressProps) => {
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

  // 이미지 전처리
  const handleImagePrePost = async (formData: RecruitPostProps) => {
    const imageFormData = new FormData();
    let responseImages; // 이미지 주소 URL이 담긴 문자열 배열

    const content = quillRef.current.firstChild.innerHTML; // Editor 안에 들어가는 content

    // Image POST 요청 선 처리 -> image URL로 이루어진 문자열 배열 받아오기
    if (companyPictures.length > 0) {
      const arr = parseImageFiles(companyPictures);

      arr.forEach((_: any, i: number) => {
        imageFormData.append('images', arr[i]);
      });

      const response = await postImageArray(imageFormData);
      responseImages = response?.data.result;
    }

    // POST 요청 함수 호출
    postRecruitWithoutTags(formData, content, addressInfo, responseImages);
  };

  // 이미지 POST 요청 함수
  const postImageArray = async (formData: FormData) => {
    let responseImageArr;
    try {
      responseImageArr = await recruitApi.postImageArray(formData);
    } catch (e: unknown) {
      alert(e);
    }

    return responseImageArr;
  };

  // Tags를 제외하고 입력 받은 정보를 가지고 POST 요청 함수
  const postRecruitWithoutTags = async (
    data: RecruitPostProps,
    content: string,
    addressInfo: AddressProps,
    companyImages: string[]
  ) => {
    const bodyData = {
      title: data.companyRecruitmentTitle,
      company: data.companyName,
      address: addressInfo,
      content,
      images: companyImages,
      phoneNumber: data.companyRecruiterContact,
    };

    // POST 요청
    postMutate(bodyData);
  };

  // React Quill Initial Value 설정
  useEffect(() => {
    if (quill) quill.clipboard.dangerouslyPasteHTML(recruitEditorInitialValue);
  }, [quill]);

  return (
    <form>
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
        <Label htmlFor="companyPictures">회사 소개 사진</Label>
        <ImageWarningMsg>✅ 사진은 .jpg .png .jpeg 파일만 가능합니다.</ImageWarningMsg>
        <ImageWarningMsg>✅ 사진 크기는 최대 5mb입니다.</ImageWarningMsg>
        <ImageWarningMsg>✅ 첨부된 사진이 없으면 기본 이미지가 보여집니다.</ImageWarningMsg>
        <FileUploader
          name="Company Picture"
          fileList={companyPictures}
          setFileList={setCompanyPictures}
          multiple
        />
        <Label htmlFor="companyIntroduction">회사 소개</Label>
        <div>
          <div ref={quillRef} />
        </div>
        <Label htmlFor="companyRecruiterContact">연락처</Label>
        <TextField
          {...register('companyRecruiterContact')}
          id="companyRecruiterContact"
          placeholder="채용 담당자의 연락처 또는 이메일을 입력해주세요:)"
          sx={{
            width: '450px',
            mt: '8px',
          }}
          helperText={<ErrorMsg>{errors.companyRecruiterContact?.message}</ErrorMsg>}
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
          onClick={handleSubmit(handleImagePrePost)}
          variant="contained"
          sx={{
            width: 450,
            height: 56,
            color: 'white',
          }}
          type="submit"
        >
          다음
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
