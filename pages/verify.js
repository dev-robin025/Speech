import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import AuthLayout from '../layout/AuthLayout';
import { protectedClient } from '../lib/client';
import { user } from '../redux/reducers/user.reducer';
import styles from '../styles/auth.module.scss';

const Verify = () => {
  const loggedUser = useSelector(user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSendCode = async () => {
    try {
      const { data } = await protectedClient.post(`${router.asPath}`);
      console.log(data);
    } catch (error) {
      if (error.status === 401) {
        // dispatch(userLogout());
        // router.push('/');
      }
      console.log('user logout:', error);
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Speech || Verify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.auth_form}>
        {/* <h1 className="logo">Speech</h1> */}
        <h1>Verification</h1>
        <h2>Thank you for registration.</h2>
        <p>
          To start exploring the Speech app, please verify your email address.
          We will send you a verification code to your email.
        </p>
        <Button label="Send Code" onClick={handleSendCode} />
      </div>
    </AuthLayout>
  );
};

export default Verify;
