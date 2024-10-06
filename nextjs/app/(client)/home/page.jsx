"use client";
import Head from 'next/head';

import { useCurrentUser } from '@/lib/user';
const FeedPage = () => {

  const { data: { user } = {}, mutate } = useCurrentUser();
  if (!user) {
    // 跳转到 login

  }

  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <div>
        home admin
      </div>
    </>
  );
};
export default FeedPage;
