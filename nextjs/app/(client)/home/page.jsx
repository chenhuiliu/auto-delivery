'use client'
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/lib/user';
const FeedPage = () => {
  const router = useRouter();
  const { data: { user } = {}, mutate } = useCurrentUser();
  if (!user) {
    router.push('/login');
    return null;
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
