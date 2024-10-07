import Head from 'next/head';
import { findUserByToken } from '../../api/users/services';
import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'
export default async () => {
  //  获取 cookie 在服务的渲染
  const cookieStore = cookies()
  const authorization = cookieStore.get('token')

  if (!authorization.value) {
    return redirect('/login')
  }

  const user = await findUserByToken(authorization.value);
  if (!user || (user && (user.token !== authorization.value))) {
    return redirect('/login');
  }

  if (user.email !== 'fengluhome@163.com') {
    return redirect('/login');
  }


  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <div>
        home admin <br />
        {authorization.value}
      </div>
    </>
  );
};

