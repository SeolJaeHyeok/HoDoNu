import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boardValidationSchema } from '@utils/validationSchema';
import { TextField, Stack, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import FormEditor from '@components/FormEditor';

interface ArticleForm {
  images: string;
  category: string; // Free, Doctor, Nurse union으로 관리
  title: string;
  content: string;
}

type BoardType = '자유게시판' | '간호사 게시판' | '의사 게시판';
export default function CreateForm() {
  /**
   * 게시판 선택
   * 게시글 제목
   * 게시글 내용
   * 생성, 취소 버튼
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleForm>({ resolver: yupResolver(boardValidationSchema) });

  const onSubmit: SubmitHandler<ArticleForm> = data => {
    console.log(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrency(e.target.value);

  const currencies = ['자유 게시판', '의사 게시판'];
  const [currency, setCurrency] = useState<BoardType>('자유게시판');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        width="550px"
        sx={{
          mt: 3,
          '& > :not(style) + :not(style)': {
            mt: 2,
          },
        }}
      >
        <TextField
          id="component-outlined"
          label="게시판"
          select
          value={currency}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
        >
          {currencies.map(option => {
            console.log(option);
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </TextField>
        <TextField type="text" id="outlined" label="제목" placeholder="제목을 입력해주세요." />
        <FormEditor />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
        }}
      >
        <Button type="submit" variant="contained" sx={buttonStyle}>
          게시글 등록
        </Button>
        <Button variant="contained" sx={buttonStyle}>
          취소
        </Button>
      </Box>
    </form>
  );
}

const buttonStyle = {
  ml: 2,
  color: '#fff',
};
