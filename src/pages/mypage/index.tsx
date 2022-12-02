import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Grid } from '@mui/material';
import Job from '@components/mypage/Job';
import ProfileCard from '@components/mypage/ProfileCard';

import Account from '@components/mypage/Account';
import Security from '@components/mypage/Security';
import Activity from '@components/mypage/Acivity';
import authApi from '@apis/auth/auth';
import { profileUrl, userInfoState } from '@atoms/userAtom';
import Sent from '@components/mypage/message/Sent';
import Received from '@components/mypage/message/Received';
import { makeProfileUrl } from '@utils/func';

export default function MypageIndex() {
  const user = useRecoilValue(userInfoState);
  const setProfileImg = useSetRecoilState(profileUrl);

  const { data } = useQuery(['detailUser', user?.userId], () => authApi.getOne(user?.userId!), {
    onSuccess: data => {
      setProfileImg(makeProfileUrl(data.data.result.imgUrl));
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const userInfo = data?.data.result;

  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 3 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: { xs: 1, md: 2 },
        p: { xs: 1, md: 2 },
      }}
    >
      {userInfo && (
        <>
          <Grid item xs={10}>
            <Grid item xs={12}>
              <ProfileCard user={userInfo} />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item xs={12} md={6}>
                <Account user={userInfo} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Job user={userInfo} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Sent />
              </Grid>
              <Grid item xs={12} md={6}>
                <Received />
              </Grid>
              <Grid item xs={12} md={6}>
                <Activity user={userInfo} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Security />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export const getServerSideProps = (context: any) => {
  if (!context.req.cookies.refreshToken) {
    return {
      redirect: {
        destination: '/login',
        permenent: false,
      },
    };
  }

  return {
    props: {},
  };
};
