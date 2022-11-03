import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('이메일 형식에 맞지 않습니다.').required('이메일은 필수 입력값입니다.'),
  password: yup.string().required('비밀번호는 필수 입력값입니다.'),
});

export const recruitPostSchema = yup.object({
  companyRecruitmentTitle: yup.string().required('공고 제목을 입력해주세요:('),
  companyName: yup.string().required('회사 이름을 입력해주세요:('),
  companyTags: yup.string().required('회사 태그를 입력해주세요:('),
  companyIntroduction: yup
    .string()
    .max(1000, '최대 20글자까지 입력가능합니다!')
    .required('회사 소개를 입력해주세요!'),
  companyRole: yup.string().required('주요 업무를 입력해주세요:('),
  companyRequirement: yup.string().required('자격 요건을 입력해주세요:('),
  companyPreference: yup.string().required('우대 사항을 입력해주세요:('),
  companyRecruiterContact: yup
    .string()
    .required('채용 담당자의 연락처 또는 이메일을 입력해주세요:('),
});
