import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { getCookie } from 'cookies-next';
import { instance } from '@apis/index';
import { isLoginState } from '@atoms/userAtom';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  userId: string;
  dehydratedState: DehydratedState;
}>) {
  const queryClient = new QueryClient();

  const initializeRecoilState = ({ set }: any) => {
    set(isLoginState, pageProps?.userId ? true : false);
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
  const role = getCookie('role', { req, res });
  const userId = getCookie('userId', { req, res });

  if (userId && role && req) {
    const res = await instance.post(`/users/${userId}/reissue/version2`, {
      role,
      refreshToken,
    });
    const newAccessToken = await res.data.result.accessToken;
    instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  }

  return {
    pageProps: { userId },
  };
};
