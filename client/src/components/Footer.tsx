import React from 'react';
import styles from '../styles/Footer.module.css';
import { ReactComponent as GithubIcon } from '../assets/github_icon.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.footer__icon}
        href="https://github.com/AlexeyFL"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon />
      </a>
    </footer>
  );
};

export default Footer;
