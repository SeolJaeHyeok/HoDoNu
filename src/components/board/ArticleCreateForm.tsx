import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@tanstack/react-query';
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
import authApi from '@apis/auth/auth';

export default function ArticleCreateForm() {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const jobCategory = userInfo?.jobCategory!;

  const [categories, setCategories] = useState<string[]>([
    categoryAssertion.FREE,
    categoryAssertion.DOCTOR,
    categoryAssertion.NURSE,
  ]);

  useQuery(['board', 'create', userInfo?.userId], () => authApi.getOne(userInfo?.userId!), {
    onSuccess: data => {
      const block = data.data.result.blockArticleCategoties;
      const newCategory = categories.filter(category => !block.includes(category));
      setCategories(newCategory);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleForm>({
    resolver: yupResolver(boardValidationSchema),
    defaultValues: {
      category: router.query.category as string,
    },
  });

  const postArticle = useMutation(['createArticle'], boardApi.createArticle, {
    onSuccess: res => {
      const { articleId } = res.data.result;
      router.push(`${jobCategory.toLowerCase()}/${articleId}`);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ArticleForm> = data => {
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

  useEffect(() => {
    if (!userInfo) {
      alert('비회원은 게시글을 작성할 수 없습니다. 로그인을 진행해주세요.');
      router.push('/login');
    }
    if (!categories.includes(router?.query?.category! as string)) {
      alert('해당 게시판의 작성권한이 없습니다.');
      router.push('/board');
    }
  }, [userInfo, router, categories]);

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
          select
          SelectProps={{
            native: true,
          }}
          {...register('category')}
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
