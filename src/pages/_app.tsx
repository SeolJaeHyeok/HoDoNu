import type { AppContext, AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import App from 'next/app';
import cookies from 'next-cookies';
import { useUserActions } from '@utils/useUserAction';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
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

// App.getInitialProps = async (appContext: AppContext) => {
//   const userAction = useUserActions;
//   const appProps = await App.getInitialProps(appContext);

//   const { ctx } = appContext;
//   const allCookies = cookies(ctx);
//   const accessTokenByCookie = allCookies.accessToken;
//   if (accessTokenByCookie !== undefined) {
//     const refreshTokenByCookie = allCookies.refreshToken || '';
//     userAction.setToken(accessTokenByCookie, refreshTokenByCookie, true);
//   }

//   return { ...appProps };
// };
