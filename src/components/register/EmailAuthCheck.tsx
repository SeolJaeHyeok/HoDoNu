import authApi from '@apis/auth/auth';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

export function EmailAuthCheck({ email }: any) {
  const [authNumber, setAuthNumber] = useState<string>('');

  const registerEmailAuthQuery = useMutation(authApi.registerEmailAuth, {
    onSuccess: () => alert(`인증에 성공하였습니다!`),
    onError: () => alert(`인증에 실패하셨습니다.`),
  });

  const handleCheckAuthPassword = () => {
    registerEmailAuthQuery.mutate({
      authNumber,
      email,
    });
  };

  const handleChangeAuthNumber = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  return (
    <>
      <Label htmlFor="userId">인증 번호 확인</Label>

      <div style={{ display: 'flex', marginTop: 8 }}>
        <TextField
          id="userId"
          placeholder="인증번호를 입력해주세요."
          sx={{
            width: '450px',
            mt: '8px',
          }}
          onChange={handleChangeAuthNumber}
        />
        <Button
          variant="contained"
          sx={{ width: '150px', height: '56px', mt: '8px' }}
          onClick={handleCheckAuthPassword}
        >
          인증 번호 확인
        </Button>
      </div>
    </>
  );
}

const Label = styled.label`
  display: block;
  margin-top: 14px;
  font-size: 14px;
`;
