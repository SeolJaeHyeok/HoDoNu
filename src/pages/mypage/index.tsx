import { Grid } from '@mui/material';
import Job from '@components/mypage/Job';
import ProfileCard from '@components/mypage/ProfileCard';
// import CustomSideBar from '@components/SideBar/CustomSideBar';
import Account from '@components/mypage/Account';
import Security from '@components/mypage/Security';
import Activity from '@components/mypage/Acivity';
import { useEffect } from 'react';
import authApi from '@apis/auth/auth';

// export default function MypageIndex({user} : any) {
export default function MypageIndex() {
  // console.log(user)
  const user = {
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

  useEffect(() => {}, []);

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
          <ProfileCard user={user} />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Account user={user} />
          </Grid>
          <Grid item xs={6}>
            <Job user={user} />
          </Grid>
          <Grid item xs={6}>
            <Activity user={user} />
          </Grid>
          <Grid item xs={6}>
            <Security user={user} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async () => {
  const userId = 'temp';
  const { data } = await authApi.getOne(userId);

  return {
    props: {
      user: data.result,
    },
  };
};
