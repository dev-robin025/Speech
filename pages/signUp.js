import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import { TbUserPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import { setUserLogIn, user } from '../redux/reducers/user.reducer';
import styles from '../styles/auth.module.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const loggedUser = useSelector(user);

  const validation = {
    name: /^[A-Z]+/,
    email: /^[A-Za-z0-9_.+-]+@[a-zA-Z]+\.[a-z]+/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    confirm_password: new RegExp(formData.password),
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/signup', formData);
      setLoading(false);
      dispatch(setUserLogIn(data.user));
    } catch (error) {
      console.log('signUp error:', error);
      toast.error(error.response.data || 'Server error.');
      setLoading(false);
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
    <>
      <Head>
        <title>Speech || Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={styles.auth_form} onSubmit={handleRegister}>
        <div>
          <h1 className="logo">Speech</h1>
          <p>You and your friends always connected.</p>
        </div>

        <Input
          placeholder="Enter your name"
          label="Name"
          name="name"
          prefix={<FiUser />}
          onChange={handleChange}
          validation={{
            pattern: validation.name,
            message: 'Name should be capitalize.',
          }}
        />

        <Input
          placeholder="something@mail.com"
          type="email"
          label="Email"
          name="email"
          prefix={<MdAlternateEmail />}
          onChange={handleChange}
          validation={{
            pattern: validation.email,
            message: 'Try with valid email format.',
          }}
        />

        <Input
          placeholder="Enter Your Password"
          name="password"
          label="Password"
          type="password"
          prefix={<MdPassword />}
          onChange={handleChange}
          validation={{
            pattern: validation.password,
            message: 'Min length 6 with capital and small letter.',
          }}
        />

        <Input
          placeholder="Should Match with password"
          name="confirm_password"
          label="Confirm Password"
          type="password"
          prefix={<MdPassword />}
          onChange={handleChange}
          validation={{
            pattern: validation.confirm_password,
            message: "Doesn't match with password.",
          }}
        />

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="agree"
            name="agree"
            value="agree"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }
          />
          <label htmlFor="agree">I agree with the Terms and Conditions.</label>
        </div>

        <Button
          label="Sign Up"
          type="submit"
          loading={loading}
          disabled={
            !formData.name ||
            !validation.name.test(formData.name) ||
            !formData.email ||
            !validation.email.test(formData.email) ||
            !formData.password ||
            !validation.password.test(formData.password) ||
            !formData.confirm_password ||
            !validation.confirm_password.test(formData.confirm_password) ||
            !formData?.agree ||
            loading
          }
          icon={<TbUserPlus />}
        />

        <p>
          Already have an account ? <Link href="/signIn">Login</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
