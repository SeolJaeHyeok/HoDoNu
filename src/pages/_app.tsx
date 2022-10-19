import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
