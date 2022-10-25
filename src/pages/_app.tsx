import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { isLoginState } from 'src/atoms/userAtom';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const initializeRecoilState = ({ set }: any) => {
    set(isLoginState, true);
  };

  return (
    <RecoilRoot initializeState={initializeRecoilState}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
