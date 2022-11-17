import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요!'),
  email: yup.string().email('이메일 형식을 맞춰주세요!').required('이메일을 입력해주세요!'),
  password: yup
    .string()
    .min(8, '최소 8글자 이상 입력해주세요!')
    .max(20, '최대 20글자까지 입력가능합니다!')
    .required('비밀번호를 입력해주세요!'),
  checkPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다!')
    .required('비밀번호를 다시 입력해주세요!'),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      '전화번호를 다시 입력해주세요'
    )
    .required('전화번호를 입력해주세요!'),
  birth: yup.string().required('생년월일을 입력해주세요!'),
  authCheck: yup.string().required('인증번호를 입력해주세요'),
});
