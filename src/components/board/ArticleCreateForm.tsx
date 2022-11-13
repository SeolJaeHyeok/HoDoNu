import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField, Stack, Button, Box } from '@mui/material';

import ArticleFormEditor from '@components/ArticleFormEditor';
import boardApi from 'src/apis/board';
import { boardValidationSchema } from '@utils/validationSchema';
import { ArticleForm } from '@interfaces/article';
import { categoryAssertion } from '@utils/const/category';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { useEffect, useState } from 'react';

export default function ArticleCreateForm() {
  const router = useRouter();
  const initBoard = router.query ? router.query.category : categoryAssertion.FREE;
  console.log(initBoard);
  const userInfo = useRecoilValue(userInfoState);
  const jobCategory = userInfo?.jobCategory!;
  const userRole = userInfo?.role;
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (userRole === 'User') {
      setCategories([categoryAssertion.FREE, jobCategory]);
    }
    if (userRole === 'Admin') {
      setCategories([categoryAssertion.FREE, categoryAssertion.DOCTOR, categoryAssertion.NURSE]);
    }
  }, [jobCategory, userRole]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleForm>({ resolver: yupResolver(boardValidationSchema) });

  const postArticle = useMutation(['createArticle'], boardApi.createArticle, {
    onSuccess: res => {
      const { articleId } = res.data.result;
      router.push(`free/${articleId}`);
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });

  const onSubmit: SubmitHandler<ArticleForm> = async data => {
    const { title, category, content } = data;
    // 게시글 생성
    postArticle.mutate({ title, category, content });
  };

  const handleCancle = () => {
    reset();
    router.back();
  };

  const onEditorStateChange = (editorState: any) => {
    editorState = editorState !== '<p><br></p>' ? editorState : '';
    setValue('content', editorState);
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
          label="게시판"
          select
          SelectProps={{
            native: true,
          }}
          {...register('category')}
          defaultValue={initBoard}
          helperText={errors.category ? errors.category.message : null}
        >
          {categories.map(item => {
            return (
              <option key={item} value={item}>
                {item}
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
          helperText={errors.title ? errors.title.message : null}
        />

        <ArticleFormEditor onChange={onEditorStateChange} height="250px" />
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
