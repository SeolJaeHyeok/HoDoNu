import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
// import App from 'next/app';
// import cookies from 'next-cookies';
// import App from 'next/app';
// import { setCookie, getCookies } from 'cookies-next';
// import axios from 'axios';

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
//   const appProps = await App.getInitialProps(appContext);

//   const res = axios.get(`13.124.110.176:5000/users/${userId}/reissue`);

//   const { ctx } = appContext;
//   const allCookies = cookies(ctx);
//   const accessTokenByCookie = allCookies.accessToken;
//   console.log('hi');
//   console.log(accessTokenByCookie);

//   if (accessTokenByCookie !== undefined) {
//     console.log(accessTokenByCookie);
//   }

//   return { ...appProps };
// };
