import React, { FC, ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import styles from '../../styles/Layout.module.css';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
