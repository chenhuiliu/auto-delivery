'use client'

import { Button } from '@/components/Button';
import { ButtonLink, ButtonDiv } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ForgetPassword.module.css';
import { useRouter } from 'next/navigation';
function IsEmail(str) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str);
}

const ForgetPasswordIndex = () => {
  const router = useRouter();
  const emailRef = useRef();
  const codeRef = useRef();
  // 'loading' || 'success'
  const [status, setStatus] = useState();
  const [status2, setStatus2] = useState();
  const [email, setEmail] = useState('');
  const onSend = useCallback(async (e) => {
    if (status2 === 'loading') {
      return;
    }
    e.preventDefault();
    if (emailRef.current.value === '') {
      toast.error('请输入邮箱！');
      return;
    }
    if (!IsEmail(emailRef.current.value)) {
      toast.error('邮箱格式不正确！');
      return;
    }

    try {
      setStatus2('loading');
      await fetcher('/api/users/password-reset/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      });
      setStatus2('success');
      toast.success('验证发送成功！');
    } catch (e) {
      toast.error(e.message);
      setStatus2(undefined);
    }
  }, [status2]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (codeRef.current.value.length < 6) {
      toast.error('验证码格式不正确！');
      return;
    }

    try {
      setStatus('loading');
      setTimeout(() => {
        router.replace('/forget-password/' + codeRef.current.value);
        setStatus('success');
      }, 200)

    } catch (e) {
      toast.error(e.message);
      setStatus(undefined);
    }
  }, []);

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        {status === 'success' ? (
          <>
            <h1 className={styles.title}>Check your inbox</h1>
            <p className={styles.subtitle}>
              An email has been sent{' '}
              <Text as="span" color="link">
                {email}
              </Text>
              输入与你的账户关联的电子邮件地址，我们将向你发送一个重置密码的验证码.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>找回密码</h1>
            <p className={styles.subtitle}>
              输入与你的账户关联的电子邮件地址，我们将向你发送一个重置密码的验证码.
            </p>
            <Spacer size={1} />
            <form onSubmit={onSubmit}>
              <div className={styles.row}>
                <div className={styles.left}>
                  <Input
                    ref={emailRef}
                    htmlType="email"
                    autoComplete="email"
                    placeholder="请输入邮箱"
                    ariaLabel="请输入邮箱"
                    size="large"
                    required
                  />
                </div>
                <div className={styles.right}>
                  <ButtonDiv
                    htmlType="submit"
                    className={styles.submit}
                    type="success"
                    size="large"
                    onClick={onSend}
                    loading={status2 === 'loading'}
                  >
                    发送邮箱验证码
                  </ButtonDiv>
                </div>

              </div>
              <Spacer size={0.5} axis="vertical" />
              <Input
                ref={codeRef}
                htmlType="text"
                autoComplete="text"
                placeholder="邮箱验证码"
                ariaLabel="邮箱验证码"
                size="large"
                required
              />

              <Spacer size={0.5} axis="vertical" />
              <Button
                htmlType="submit"
                className={styles.submit}
                type="success"
                size="large"
                loading={status === 'loading'}
              >
                提交
              </Button>
            </form>
          </>
        )}
        <Spacer size={0.25} axis="vertical" />

        <ButtonLink href="/login" type="success" size="large" variant="ghost">
          跳转到登录
        </ButtonLink>

      </div>
    </Wrapper>
  );
};

export default ForgetPasswordIndex;
