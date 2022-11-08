import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('이메일 형식에 맞지 않습니다.').required('이메일은 필수 입력값입니다.'),
  password: yup.string().required('비밀번호는 필수 입력값입니다.'),
});

export const boardValidationSchema = yup.object({
  category: yup.string().required(),
  title: yup.string().required().max(50),
  content: yup.string().required().min(10),
});

export const updatePasswordSchema = yup.object({
  presentPassword: yup
    .string()
    .min(8, '최소 8글자 이상 입력해주세요!')
    .max(20, '최대 20글자까지 입력가능합니다!')
    .required('비밀번호를 입력해주세요!'),
  updatePassword: yup
    .string()
    .min(8, '최소 8글자 이상 입력해주세요!')
    .max(20, '최대 20글자까지 입력가능합니다!')
    .required('비밀번호를 입력해주세요!'),
  checkPassword: yup
    .string()
    .oneOf([yup.ref('updatePassword'), null], '비밀번호가 일치하지 않습니다!')
    .required('비밀번호를 다시 입력해주세요!'),
});
