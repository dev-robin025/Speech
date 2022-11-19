/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layout/AuthLayout';
import { client } from '../lib/client';
import { setUserLogIn, user } from '../redux/reducers/user.reducer';
import styles from '../styles/auth.module.scss';
import formRegex from '../utils/regex';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const loggedUser = useSelector(user);
  const router = useRouter();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await client.post('signIn', formData);
      setLoading(false);
      dispatch(setUserLogIn(data.user));
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data || 'Server error.');
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      switch (loggedUser.isVerified) {
        case false:
          router.push('/verify?user=' + loggedUser?._id);
          break;

        default:
          router.push('/');
          break;
      }
    }
  }, [loggedUser, router]);

  return (
    <AuthLayout>
      <Head>
        <title>Speech || Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={styles.auth_form} onSubmit={handleLogin}>
        <div>
          <h1>Login</h1>
          <p>You and your friends always connected.</p>
        </div>

        <Input
          placeholder="something@mail.com"
          type="email"
          label="Email"
          variant="form"
          name="email"
          prefix={<FiUser />}
          onChange={handleChange}
          validation={{
            pattern: formRegex.email,
            message: 'Try with valid email format.',
          }}
        />

        <Input
          placeholder="Enter Your Password"
          name="password"
          label="Password"
          type="password"
          variant="form"
          prefix={<MdPassword />}
          onChange={handleChange}
          validation={{
            pattern: formRegex.password,
            message: 'Min length 6 with capital and small letter.',
          }}
        />

        <Button
          label="Sign In"
          loading={loading}
          disabled={
            !formData.email ||
            !formRegex.email.test(formData.email) ||
            !formData.password ||
            !formRegex.password.test(formData.password) ||
            loading
          }
          type="submit"
          icon={<BiLogIn />}
        />

        <p>
          Don't have account ? <Link href="/signUp">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
