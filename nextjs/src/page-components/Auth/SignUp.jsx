'use client'

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';
import md5 from 'md5';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();


  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (passwordRef.current.value.length < 6) {
        toast.error('密码不能小于 6 位。');
        return;
      }

      setIsLoading(true);
      fetcher('/api/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: md5(passwordRef.current.value),
          username: usernameRef.current.value,
        }),
      }).then((response) => {
        toast.success('用户创建成功！');
        router.replace('/login');
      }).catch((err) => {
        toast.error(err.message);
      }).finally(() => {
        setIsLoading(false);
      })
      return false;
    },
    [router]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>Join Now</h1>
        <form onSubmit={onSubmit}>
          <Container alignItems="center">
            <p className={styles.subtitle}>Your login</p>
            <div className={styles.seperator} />
          </Container>
          <Input
            ref={emailRef}
            htmlType="email"
            autoComplete="email"
            placeholder="Email Address"
            ariaLabel="Email Address"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={passwordRef}
            htmlType="password"
            autoComplete="new-password"
            placeholder="Password"
            ariaLabel="Password"
            size="large"
            required
          />
          <Spacer size={0.75} axis="vertical" />
          <Container alignItems="center">
            <p className={styles.subtitle}>About you</p>
            <div className={styles.seperator} />
          </Container>
          <Input
            ref={usernameRef}
            autoComplete="username"
            placeholder="Username"
            ariaLabel="Username"
            size="large"
            required
          />
          <Spacer size={1} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={isLoading}
          >
            Sign up
          </Button>
        </form>
      </div>
      <div className={styles.footer}>
        <TextLink href="/login" color="link" variant="highlight">
          Already have an account? Log in
        </TextLink>
      </div>
    </Wrapper>
  );
};

export default SignUp;
