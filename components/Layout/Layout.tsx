import { ReactNode } from 'react';
import Head from 'next/head';

import NavBar from './NavBar';

import { theme } from '../../styles/theme';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div style={{ backgroundColor: theme.palette.secondary.light }}>
    <div>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <NavBar />
      </header>
      {children}
    </div>
  </div>
);

export default Layout;
