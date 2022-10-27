import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boardValidationSchema } from '@utils/validationSchema';
import { TextField, Stack, Button, Box } from '@mui/material';
import React from 'react';
// import FormEditor from '@components/FormEditor';
import { useMutation } from 'react-query';
import boardApi from 'src/apis/board';
// import { useRouter } from 'next/router';
// import TempFormEditor from '@components/TempFormEditor';
// import { useEffect } from 'react';
import TempFormEditor2 from '@components/TempFormEditor2';

interface ArticleForm {
  images: string;
  category: string; // Free, Doctor, Nurse union으로 관리
  title: string;
  content: string;
}

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<ArticleForm>({ resolver: yupResolver(boardValidationSchema) });
  // const router = useRouter();

  const mutation = useMutation(['createArticle'], boardApi.createFreeBoard, {
    onSuccess: data => {
      console.log(data);
    },
    onError: (e: Error) => {
      console.log(e.message);
      alert(e.message);
    },
  });

  // useEffect(() => {
  //   register('content');
  // }, [register]);

  const onSubmit: SubmitHandler<ArticleForm> = async data => {
    console.log(data);
    const { title, category, content, images } = data;

    // 게시글 생성
    mutation.mutate({ title, category, content, images });
    // router.push('/'); // 해당 게시글로 보내기
  };
  const boards = ['자유 게시판', '의사 게시판'];

  const onEditorStateChange = (editorState: any) => {
    editorState = editorState !== '<p><br></p>' ? editorState : '';
    setValue('content', editorState);
  };
  // const editorContent = watch('content');
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
          select
          SelectProps={{
            native: true,
          }}
          {...register('category')}
        >
          {boards.map(option => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </TextField>
        <TextField
          type="text"
          id="outlined"
          label="제목"
          placeholder="제목을 입력해주세요."
          {...register('title')}
        />
        {/* <FormEditor onChange={onEditorStateChange} /> */}
        {/* <TempFormEditor onChange={onEditorStateChange} /> */}
        <TempFormEditor2 onChange={onEditorStateChange} />
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
