import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('이메일 형식에 맞지 않습니다.').required('이메일은 필수 입력값입니다.'),
  password: yup.string().required('비밀번호는 필수 입력값입니다.'),
});

export const boardValidationSchema = yup.object({
  images: yup.string(),
  category: yup.string().required(),
  title: yup.string().required(),
  content: yup.string().required(),
});
