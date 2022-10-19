import Head from 'next/head';

interface HelmetProps {
  title: string;
}

export default function Helmet({ title }: HelmetProps) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
