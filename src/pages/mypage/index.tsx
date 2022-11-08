import { Grid } from '@mui/material';
import Job from '@components/mypage/Job';
import ProfileCard from '@components/mypage/ProfileCard';
// import CustomSideBar from '@components/SideBar/CustomSideBar';
import Account from '@components/mypage/Account';
import Security from '@components/mypage/Security';
import Activity from '@components/mypage/Acivity';
import authApi from '@apis/auth/auth';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';

// export default function MypageIndex({user} : any) {
export default function MypageIndex() {
  const user = useRecoilValue(userInfoState);
  const tempuser = {
    userId: '06761c4e-a974-4317-90c1-3f16a2a1290b',
    email: 'admin@admin.com',
    name: '김동현',
    phoneNumber: '01011111111',
    birth: '19950510',
    jobCategory: 'Doctor',
    imgUrl: 'https://toy-project-s3.s3.ap-northeast-2.amazonaws.com/user/basic/basic-Image.png',
    role: 'Admin',
    introduce: ' 안녕하세요. ',
    isRecruiter: false,
    nickname: 'equal_scarlet_amphibian',
    hospitalAddress: '',
    hospitalAddressDetail: '',
    hospitalAddressNumber: '',
    blockArticleCategoties: [],
    totalArticles: 27,
    isAuth: false,
  };

  const { data } = useQuery(['detailUser'], () => authApi.getOne(user?.userId!));
  console.log(data?.result);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 2,
        p: 2,
      }}
    >
      {/* <CustomSideBar /> */}
      <Grid item xs={10}>
        <Grid item xs={12}>
          {data?.result && <ProfileCard user={data.result} />}
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {data?.result && <Account user={data.result} />}
          </Grid>
          <Grid item xs={6}>
            {data?.result && <Job user={data.result} />}
          </Grid>
          <Grid item xs={6}>
            {data?.result && <Activity user={data.result} />}
          </Grid>
          <Grid item xs={6}>
            {data?.result && <Security user={data.result} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
