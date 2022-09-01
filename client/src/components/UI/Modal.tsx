import React, { FC, ReactNode } from 'react';
import styles from '../../styles/Modal.module.css';

interface IModal {
  children: ReactNode;
  setVisible: (isVisible: boolean) => void;
  visible: boolean;
}

const Modal: FC<IModal> = ({ children, setVisible, visible }) => {
  const rootClasses = [styles.modal];
  if (visible) {
    rootClasses.push(styles.active);
  }
  return (
    <div onClick={() => setVisible(false)} className={rootClasses.join(' ')}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles['modal__content']}
      >
        <span
          onClick={() => setVisible(false)}
          className={styles['modal__close']}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
