import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { boardValidationSchema } from '@utils/validationSchema';
import { Box, Button, Stack, TextField } from '@mui/material';
import ArticleFormEditor from '@components/ArticleFormEditor';
import { useRouter } from 'next/router';
import boardEditApi from '@apis/board/edit';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { ArticleFormProps } from '@interfaces/board';

export default function EditForm({ data, category }: any) {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const { title, content, articleId } = data;

  useEffect(() => {
    if (!userInfo) {
      alert('비회원은 게시글을 작성할 수 없습니다. 로그인을 진행해주세요.');
      router.push('/login');
    }
  }, [userInfo, router]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleFormProps>({
    resolver: yupResolver(boardValidationSchema),
    defaultValues: {
      title,
      category,
      content,
    },
  });

  const mutation = useMutation(['createArticle'], boardEditApi.updateArticle, {
    onSuccess: res => {
      const { articleId } = res;
      router.push(`${category.toLowerCase()}/${articleId}`);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const onEditorStateChange = (editorState: any) => {
    editorState = editorState !== '<p><br></p>' ? editorState : '';
    setValue('content', editorState);
  };

  const onSubmit: SubmitHandler<ArticleFormProps> = async data => {
    const { title, category, content } = data;
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
          width: { xs: '300px', sm: '650px' },
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
