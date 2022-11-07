import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import CustomSideBar from '@components/SideBar/CustomSideBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <NavBar />
        {/* <CustomSideBar /> */}
      </header>
      <main> {children}</main>
    </div>
  );
}
