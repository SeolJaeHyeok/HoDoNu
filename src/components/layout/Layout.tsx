import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';

import CustomSideBar from '@components/SideBar/CustomSideBar';
import useSidebarValidation from '@hooks/useSidebarValidation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isActive } = useSidebarValidation();
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <NavBar />
        {isActive && <CustomSideBar />}
      </header>
      <main> {children}</main>
    </div>
  );
}
