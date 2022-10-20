import CustomInput from '@components/CustomInput';
import styled from '@emotion/styled';
import CustomButton from '@components/CustomButton';
import { useDaumPostcodePopup } from 'react-daum-postcode';
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
        <Label>이름</Label>
        <CustomInput
          placeholder="이름을 입력해주세요."
          custom={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label>아이디</Label>
        <CustomInput
          placeholder="이메일을 입력해주세요."
          custom={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label>비밀번호</Label>
        <CustomInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          custom={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label>비밀번호 확인</Label>
        <CustomInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          custom={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label>생년월일</Label>
        <CustomInput type="date" custom={{ width: 220, mt: '8px' }} />
        <Label>직업</Label>
        <CustomInput
          placeholder="의사 or 간호사만 입력해주세요."
          custom={{
            width: '450px',
            mt: '8px',
          }}
        />
        <Label>소속 기관 ( 병원 주소 )</Label>
        <PostalCodeContainer
          style={{
            marginTop: '8px',
          }}
        >
          <CustomInput
            placeholder="우편번호"
            value={zipCode}
            custom={{
              width: '225px',
            }}
          />
          <CustomButton width={225} height={56} type={'outlined'} onClick={handleClickOpen}>
            주소 검색
          </CustomButton>
        </PostalCodeContainer>
        <AddressContainer>
          <CustomInput
            placeholder="주소"
            value={roadAddress}
            custom={{
              width: '450px',
              mt: '8px',
            }}
          />
          <CustomInput
            placeholder="상세 주소"
            value={detailAddress}
            handleChange={handleDetailAddress}
            custom={{
              width: '450px',
              mt: '8px',
              mb: '10px',
            }}
          />
        </AddressContainer>

        <CustomButton width={450} height={56} type={'contained'} color="white">
          등록하기
        </CustomButton>
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
