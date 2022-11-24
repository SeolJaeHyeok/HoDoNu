import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
// import { isLoginState } from '@atoms/userAtom';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryClient = new QueryClient();
  // const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
  // const test = sessionStorage?.getItem('recoil-persist');
  // console.log('test', test);

  // const token = sessionStorage?.getItem('token');
  // console.log('token', token);

  // function initializeState({ set }: { set: any }) {
  //   set(isLoginState, true);
  // }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
