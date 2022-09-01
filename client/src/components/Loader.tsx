import React, { FC } from 'react';
import styles from '../styles/Loader.module.css';

interface ILoader {
  width?: number;
  height?: number;
  inline?: boolean;
}

const Loader: FC<ILoader> = ({ width, height, inline = false }) => {
  return (
    <div
      style={{ width, height, display: inline ? 'inline-block' : 'block' }}
      className={styles.loader}
    ></div>
  );
};

export default Loader;
