'use server'
import { findTokenByIdAndType } from '../../../api/users/services';
import { ForgetPasswordToken } from '@/page-components/ForgetPassword';
import Head from 'next/head';

const ResetPasswordTokenPage = async ({
  params: { token },
}) => {
  const item = await findTokenByIdAndType(
    token
  ) ?? {};
  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <ForgetPasswordToken valid={!!item} token={item.code1} />
    </>
  );
};



export default ResetPasswordTokenPage;
