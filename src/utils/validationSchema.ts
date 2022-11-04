import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('이메일 형식에 맞지 않습니다.').required('이메일은 필수 입력값입니다.'),
  password: yup.string().required('비밀번호는 필수 입력값입니다.'),
});

export const recruitPostSchema = yup.object({
  companyRecruitmentTitle: yup.string().required('공고 제목을 입력해주세요:('),
  companyName: yup.string().required('회사 이름을 입력해주세요:('),
  companyRecruiterContact: yup
    .string()
    .required('채용 담당자의 연락처 또는 이메일을 입력해주세요:('),
});

export const boardValidationSchema = yup.object({
  category: yup.string().required(),
  title: yup.string().required().max(50),
  content: yup.string().required().min(10),
});
