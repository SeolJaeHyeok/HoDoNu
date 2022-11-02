import { useRouter } from 'next/router';

import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField, Stack, Button, Box } from '@mui/material';

import ArticleFormEditor from '@components/ArticleFormEditor';
import boardApi from 'src/apis/board';
import { boardValidationSchema } from '@utils/validationSchema';
import { ArticleForm } from '@interfaces/article';
import { categoryAssertion } from '@utils/const/category';

export default function ArticleCreateForm() {
  const router = useRouter();

  const initBoard = router.query.category || categoryAssertion.FREE;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleForm>({ resolver: yupResolver(boardValidationSchema) });

  const mutation = useMutation(['createArticle'], boardApi.createFreeArticle, {
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
    mutation.mutate({ title, category, content });
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
          <option value={categoryAssertion.NURSE}>간호사 게시판</option>
          <option value={categoryAssertion.DOCTOR}>의사 게시판</option>
          <option value={categoryAssertion.FREE}>자유 게시판</option>
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
