import styled from '@emotion/styled';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userApi } from 'src/apis/user/user';
import { useRouter } from 'next/router';

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  phoneNumber: string;
  birth: string;
  jobCategory: string;
}

export default function Register() {
  const [hospitalAddressNumber, setHospitalAddressNumber] = useState<string>();
  const [hospitalAddress, setHospitalAddress] = useState<string>('');
  const [hospitalAddressDetail, setHospitalAddressDetail] = useState<string>('');
  const [registerUserData, setRegisterUserData] = useState<any>();

  const router = useRouter();

  const registerSchema = yup.object({
    name: yup.string().required('이름을 입력해주세요!'),
    email: yup.string().email('이메일 형식을 맞춰주세요!').required('이메일을 입력해주세요!'),
    password: yup
      .string()
      .min(8, '최소 8글자 이상 입력해주세요!')
      .max(20, '최대 20글자까지 입력가능합니다!')
      .required('비밀번호를 입력해주세요!'),
    checkPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다!')
      .required('비밀번호를 다시 입력해주세요!'),
    phoneNumber: yup.string().required('전화번호를 입력해주세요!'),
    birth: yup.string().required('생년월일을 입력해주세요!'),
  });

  // react-hook-form 관련
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(registerSchema),
  });

  // 주소 관련 함수
  const open = useDaumPostcodePopup();

  const handleClickOpen = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    setHospitalAddressNumber(data.zonecode);
    setHospitalAddress(data.roadAddress);
  };

  const handleDetailAddress = (e: any) => {
    setHospitalAddressDetail(e.target.value);
  };

  // react-hook-form 관련 홤수
  const handleMergeFormData = async (data: RegisterFormProps) => {
    await setRegisterUserData({
      ...data,
      hospitalAddressNumber,
      hospitalAddress,
      hospitalAddressDetail,
    });
    await handleRequestUserData();
  };

  const handleRequestUserData = async () => {
    try {
      await userApi.register(registerUserData);
      router.push('/login');
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(data => handleMergeFormData(data))}>
      <RegisterWrapper>
        <RegisterTitle>회원가입</RegisterTitle>
        <RegisterSubTitle>아래 모든 내용을 기입해주세요.</RegisterSubTitle>
        <Label htmlFor="userName">이름</Label>
        <TextField
          id="userName"
          placeholder="이름을 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
          {...register('name')}
        />
        {<ErrorMsg>{errors.name?.message}</ErrorMsg>}

        <Label htmlFor="userId">아이디</Label>
        <TextField
          id="userId"
          placeholder="이메일을 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
          {...register('email')}
        />
        {<ErrorMsg>{errors.email?.message}</ErrorMsg>}

        <Label htmlFor="password">비밀번호</Label>
        <TextField
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
          {...register('password')}
        />
        {<ErrorMsg>{errors.password?.message}</ErrorMsg>}

        <Label htmlFor="checkPassword">비밀번호 확인</Label>
        <TextField
          id="checkPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
          {...register('checkPassword')}
        />
        {<ErrorMsg>{errors.checkPassword?.message}</ErrorMsg>}

        <Label htmlFor="phoneNumber">전화번호</Label>
        <TextField
          id="phoneNumber"
          placeholder="전화번호를 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
          {...register('phoneNumber')}
        />
        {<ErrorMsg>{errors.phoneNumber?.message}</ErrorMsg>}
        <Label htmlFor="birthDate">생년월일</Label>
        <TextField
          id="birthDate"
          type="date"
          sx={{ width: 220, mt: '8px' }}
          {...register('birth')}
        />
        {<ErrorMsg>{errors.birth?.message}</ErrorMsg>}
        <Label htmlFor="job">직업</Label>
        <JobSelect {...register('jobCategory')}>
          <option value="Doctor">의사</option>
          <option value="Nurse">간호사</option>
        </JobSelect>
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
            value={hospitalAddress}
            sx={{
              width: '450px',
              mt: '8px',
            }}
          />
          <TextField
            placeholder="상세 주소"
            value={hospitalAddressDetail}
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
        <GoToLogin>로그인으로 돌아가시겠습니까?</GoToLogin>
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
const GoToLogin = styled.p`
  color: #bdbdbd;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const JobSelect = styled.select`
  display: block;
  width: 450px;
  height: 56px;
  padding: 16.5px 14px;
  border-radius: 3px;
  border: 1px solid #adabab;
`;

const ErrorMsg = styled.span`
  display: block;
  margin-top: 8px;
  color: red;
`;
