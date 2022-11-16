import { SubmitHandler, useForm } from 'react-hook-form';
import { ArticleForm } from '@interfaces/article';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { boardValidationSchema } from '@utils/validationSchema';
import { Box, Button, Stack, TextField } from '@mui/material';
import ArticleFormEditor from '@components/ArticleFormEditor';
import { useRouter } from 'next/router';
import boardApi from '@apis/board';
import React from 'react';

export default function EditForm({ data, category }: any) {
  const router = useRouter();
  const { title, content, articleId } = data;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleForm>({ resolver: yupResolver(boardValidationSchema) });

  const mutation = useMutation(['createArticle'], boardApi.updateArticle, {
    onSuccess: res => {
      const { articleId } = res.data.result;
      router.push(`free/${articleId}`);
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });

  const onEditorStateChange = (editorState: any) => {
    editorState = editorState !== '<p><br></p>' ? editorState : '';
    setValue('content', editorState);
  };

  register('category', { value: category });
  register('title', { value: title });

  const onSubmit: SubmitHandler<ArticleForm> = async data => {
    const { title, category, content } = data;

    // 게시글 생성
    mutation.mutate({ title, category, content, articleId });
  };

  const handleCancle = () => {
    reset();
    router.back();
  };

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
          {...register('category')}
          helperText={errors.category ? errors.category.message : null}
          disabled
        ></TextField>

        <TextField
          type="text"
          id="outlined"
          {...register('title')}
          helperText={errors.title ? errors.title.message : null}
        />

        <ArticleFormEditor onChange={onEditorStateChange} height="250px" content={content} />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
        }}
      >
        <Button type="submit" variant="contained" sx={buttonStyle}>
          게시글 수정
        </Button>
        <Button variant="contained" sx={buttonStyle} onClick={handleCancle}>
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
