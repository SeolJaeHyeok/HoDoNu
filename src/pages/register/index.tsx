import styled from '@emotion/styled';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Register() {
  const [zipCode, setZipcode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');

  const open = useDaumPostcodePopup();

  const handleClickOpen = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    setZipcode(data.zonecode); // 추가
    setRoadAddress(data.roadAddress); // 추가
  };

  const handleDetailAddress = (e: any) => {
    setDetailAddress(e.target.value);
  };

  return (
    <form>
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
        />
        <Label htmlFor="userId">아이디</Label>
        <TextField
          id="userId"
          placeholder="이메일을 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label htmlFor="password">비밀번호</Label>
        <TextField
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
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
        />
        <Label htmlFor="birthDate">생년월일</Label>
        <TextField id="birthDate" type="date" sx={{ width: 220, mt: '8px' }} />
        <Label htmlFor="job">직업</Label>
        <JobSelect>
          <option value="doctor">의사</option>
          <option value="nurse">간호사</option>
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
            value={zipCode}
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
            value={roadAddress}
            sx={{
              width: '450px',
              mt: '8px',
            }}
          />
          <TextField
            placeholder="상세 주소"
            value={detailAddress}
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
