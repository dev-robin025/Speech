import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import landingImage from '../assets/chat.gif';
import Button from '../components/Button';
import Conversation from '../components/Conversation';
import Layout from '../layout';
import { user } from '../redux/reducers/user.reducer';
import styles from '../styles/landingPage.module.scss';
import { ChatContext } from './_app';

export default function LandingPage() {
  const loggedUser = useSelector(user);
  const { chatOn } = useContext(ChatContext);
  const router = useRouter();

  useEffect(() => {
    if (loggedUser && !loggedUser?.isVerified) {
      router.push('/verify?user=' + loggedUser?._id);
    }
  }, [loggedUser, router]);

  return (
    <div>
      <Head>
        <title>Speech</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loggedUser && (
        <div className={styles.landing_wrapper}>
          <div className={styles.content}>
            <div>
              <h1 className="logo">Speech</h1>
              <p>Get Start With Sign Up or Sign In.</p>
            </div>
            <div className={styles.image}>
              <Image src={landingImage} alt="" layout="fill" />
            </div>
            <Link href="/signUp">
              <Button label="Sign Up"></Button>
            </Link>

            <Link href="/signIn">
              <button className={styles.signIn}>Sign In</button>
            </Link>
          </div>
        </div>
      )}
      {loggedUser?.isVerified && (
        <Layout>{chatOn ? <Conversation /> : <h1>Hello World</h1>}</Layout>
      )}
    </div>
  );
}
