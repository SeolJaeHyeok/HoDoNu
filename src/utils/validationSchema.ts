import { Category } from '@interfaces/article';
import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('이메일 형식에 맞지 않습니다.').required('이메일은 필수 입력값입니다.'),
  password: yup.string().required('비밀번호는 필수 입력값입니다.'),
});

export const boardValidationSchema = yup.object({
  category: yup.mixed().oneOf(Object.values(Category)).required(),
  title: yup.string().required().max(50),
  content: yup.string().required().min(10),
});
