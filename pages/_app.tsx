import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../styles/theme';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout title='Todo List'>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
