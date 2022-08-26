import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Auth from '../components/Auth';
import { user } from '../redux/reducers/user.reducer';
import styles from './layout.module.scss';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  const loggedUser = useSelector(user);
  console.log(loggedUser);

  const router = useRouter();
  const { userId } = router.query;

  return loggedUser ? (
    <main className={styles.container}>
      <div
        className={`${styles.sidebar} ${
          userId ? styles.sidebar_small_style : ''
        }`}
      >
        <Sidebar />
      </div>

      <div
        className={`${styles.conversation} ${
          userId ? styles.conversation_small_style : ''
        }`}
      >
        {children}
      </div>
    </main>
  ) : (
    <Auth />
  );
};

export default Layout;
