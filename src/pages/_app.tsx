import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { getCookie } from 'cookies-next';

import { isLoginState, userInfoState } from '@atoms/userAtom';
import { instance } from '@apis/index';
import { decodeJWT } from '@utils/decodeJWT';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  userId: string;
  decodedToken: any;
  dehydratedState: DehydratedState;
}>) {
  const queryClient = new QueryClient();

  const initializeRecoilState = ({ set }: any) => {
    set(isLoginState, pageProps?.userId ? true : false);
    set(userInfoState, pageProps.decodedToken ? { ...pageProps.decodedToken } : null);
  };

  return (
    <RecoilRoot initializeState={initializeRecoilState}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Hydrate state={pageProps?.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async (ctx: any) => {
  const { req, res } = ctx.ctx;
  const refreshToken = getCookie('refreshToken', { req, res });
  const userId = getCookie('userId', { req, res });
  let decodedToken;

  if (userId && req && refreshToken) {
    const res = await instance.post(`/users/${userId}/reissue/version2`, {
      refreshToken,
    });
    const newAccessToken = res.data.result.accessToken;
    decodedToken = await decodeJWT(newAccessToken);
    instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
    console.log(instance.defaults.headers);
  }

  return {
    pageProps: { userId, decodedToken },
  };
};
