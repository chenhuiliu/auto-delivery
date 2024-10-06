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
  let isValid = !!item;
  // 验证当前时间是否过期
  if (!item || Date.now() > item.code1ExpireAt) {
    isValid = false;
  }
  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <ForgetPasswordToken valid={isValid} email={item.email} token={item.code1} />
    </>
  );
};



export default ResetPasswordTokenPage;
