import { Box } from '@mui/material';
import Job from '@components/mypage/Job';
import Personal from '@components/mypage/Personal';
// import authApi from '@apis/auth/auth';

// export default function MypageIndex({user} : any) {
export default function MypageIndex() {
  const user = {
    userId: 'd5692339-6a16-4fb5-b215-d5c5f10e531e',
    email: 'admin@admin.com',
    name: '김동현',
    phoneNumber: '01011111111',
    birth: '19950510',
    jobCategory: 'Doctor',
    imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
    role: 'Admin',
    introduce: '',
    isRecruiter: false,
    nickname: 'geographical_violet_mockingbird',
    hospitalAddress: '서울특별시 관악구 신림동',
    hospitalAddressDetail: '엠서클',
    hospitalAddressNumber: 54545,
    blockArticleCategoties: ['Doctor', 'Nurse'],
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        m: 2,
      }}
    >
      <Box>
        <Personal user={user} />
      </Box>
      <Box>
        <Job user={user} />
      </Box>
    </Box>
  );
}

// export const getServerSideProps = async() => {
//   const userId = 'temp'
//   const {data} = await authApi.getOne(userId)

//   return {props: {
//     user: data.result
//   }}
// }
