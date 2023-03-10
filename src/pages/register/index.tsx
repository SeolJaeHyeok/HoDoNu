import styled from '@emotion/styled';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authApi from '@apis/auth';
import { useRouter } from 'next/router';
import { RegisterUserInfo } from '@interfaces/user/index';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { registerSchema } from '@utils/registerSchema';

export default function Register() {
  const [isCheckPasswordAuth, setIsCheckPasswordAuth] = useState<boolean>(false);
  const [isRegisterAuth, setIsRegisterAuth] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<string>('');

  const router = useRouter();

  const registerEmailAuthQuery = useMutation(authApi.registerEmailAuth, {
    onSuccess: () => {
      alert(`인증에 성공하였습니다!`);
      setIsCheckPasswordAuth(!isCheckPasswordAuth);
      setIsRegisterAuth(!isRegisterAuth);
    },
    onError: () => alert(`인증에 실패하셨습니다.`),
  });

  const handleCheckAuthPassword = () => {
    registerEmailAuthQuery.mutate({
      authNumber,
      email: getValues('email'),
    });
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RegisterUserInfo>({
    resolver: yupResolver(registerSchema),
  });

  const checkEmailAuth = useMutation(authApi.registerEmailCheck, {
    onSuccess: () => {
      alert(`전송되었습니다.`);
      setIsCheckPasswordAuth(!isCheckPasswordAuth);
    },
    onError: () => alert(`이메일을 입력해주세요`),
  });

  // 주소 관련 함수
  const open = useDaumPostcodePopup();

  const handleClickOpen = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    setValue('postalCode', data.zonecode);
    setValue('mainAddress', data.roadAddress);
  };

  const handleCheckEmailAuth = () => {
    const email = getValues('email');
    checkEmailAuth.mutate(email);
  };

  const handleChangeAuthNumber = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  // react-hook-form 관련 홤수
  const handleMergeFormData = async (data: RegisterUserInfo) => {
    const registerUserData = {
      ...data,
      address: {
        mainAddress: getValues('mainAddress'),
        detailAddress: getValues('detailAddress'),
        postalCode: getValues('postalCode'),
      },
    };

    await handleRequestUserData(registerUserData);
  };

  const handleRequestUserData = async (registerUserData: RegisterUserInfo) => {
    try {
      await authApi.register(registerUserData);
      router.push('/login');
    } catch (e: any) {
      alert(e.response.data.message);
      // 해당 이메일은 존재하는 이메일입니다!
      if (e.response.status === 400) {
        setIsRegisterAuth(!isRegisterAuth);
      }
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
          helperText={<ErrorMsg>{errors.name?.message}</ErrorMsg>}
        />

        <Label htmlFor="userId">아이디</Label>
        <div style={{ display: 'flex' }}>
          <TextField
            id="userId"
            placeholder="이메일을 입력해주세요."
            sx={{
              width: '450px',
              mt: '8px',
            }}
            {...register('email')}
            helperText={<ErrorMsg>{errors.email?.message}</ErrorMsg>}
          />
          <Button
            variant="contained"
            sx={{ width: '170px', height: '56px', mt: '8px' }}
            onClick={handleCheckEmailAuth}
          >
            이메일 인증
          </Button>
        </div>

        <Label htmlFor="userId">인증 번호 확인</Label>

        <div style={{ display: 'flex', marginTop: 8 }}>
          <TextField
            id="userId"
            placeholder="인증번호를 입력해주세요."
            sx={{
              width: '450px',
              mt: '8px',
            }}
            {...register('authCheck')}
            helperText={<ErrorMsg>{errors.authCheck?.message}</ErrorMsg>}
            onChange={handleChangeAuthNumber}
            disabled={!isCheckPasswordAuth}
          />
          <Button
            variant="contained"
            sx={{ width: '170px', height: '56px', mt: '8px' }}
            onClick={handleCheckAuthPassword}
            disabled={!isCheckPasswordAuth}
          >
            인증 번호 확인
          </Button>
        </div>

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
          helperText={<ErrorMsg>{errors.password?.message}</ErrorMsg>}
        />

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
          helperText={<ErrorMsg>{errors.checkPassword?.message}</ErrorMsg>}
        />

        <Label htmlFor="phoneNumber">전화번호</Label>
        <TextField
          id="phoneNumber"
          placeholder="양식에 맞춰 작성해주세요. ( EX. 010-9999-9999 )"
          sx={{
            width: '450px',
            mt: '8px',
          }}
          {...register('phoneNumber')}
          helperText={<ErrorMsg>{errors.phoneNumber?.message}</ErrorMsg>}
        />

        <Label htmlFor="birthDate">생년월일</Label>
        <TextField
          id="birthDate"
          type="date"
          sx={{ width: 220, mt: '8px' }}
          {...register('birth')}
          helperText={<ErrorMsg>{errors.birth?.message}</ErrorMsg>}
        />

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
            sx={{
              width: '225px',
            }}
            {...register('postalCode')}
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
            sx={{
              width: '450px',
              mt: '8px',
            }}
            {...register('mainAddress')}
          />
          <TextField
            placeholder="상세 주소"
            sx={{
              width: '450px',
              mt: '8px',
              mb: '10px',
            }}
            {...register('detailAddress')}
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
          disabled={!isRegisterAuth}
        >
          등록하기
        </Button>
        <GoToLogin>
          <Link href={'/login'}>로그인으로 돌아가시겠습니까?</Link>
        </GoToLogin>
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
