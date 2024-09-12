'use client'

import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace('/feed');
  }, [user, router, isValidating]);

  const onSubmit = useCallback(
    async (event) => {
      setIsLoading(true);
      event.preventDefault();

      const response = await fetcher('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      }).then((response) => {
        toast.success('You have been logged in.');
      }).catch((error) => {
        toast.error(error.message);
      }).finally(() => {
        setIsLoading(false);
      });
      // mutate({ user: response.user }, false);
    },
    [mutate]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>Login to App</h1>
        <form onSubmit={onSubmit}>
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
            autoComplete="current-password"
            placeholder="Password"
            ariaLabel="Password"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={isLoading}
          >
            Log in
          </Button>
          <Spacer size={0.25} axis="vertical" />

          <ButtonLink href="/forget-password" type="success" size="large" variant="ghost">
            Forget password
          </ButtonLink>

        </form>
      </div>
      <div className={styles.footer}>

        <TextLink color="link" href="/sign-up" variant="highlight">
          Don&apos;t have an account? Sign Up
        </TextLink>

      </div>
    </Wrapper>
  );
};

export default Login;
