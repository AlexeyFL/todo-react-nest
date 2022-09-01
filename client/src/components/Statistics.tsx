import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import styles from '../styles/Statistics.module.css';
import Loader from './Loader';

const Statistics = () => {
  const { isLoading, tasks } = useAppSelector((state) => state.tasks);

  const completed = tasks.reduce((acc, item) => {
    if (item.complete) {
      return (acc += 1);
    }
    return acc;
  }, 0);

  return (
    <div className={styles.statistics}>
      <span className={styles.statistics__heading}>All: </span>
      <strong className={styles.statistics__count}>
        {isLoading ? (
          <Loader width={15} height={15} inline={true} />
        ) : (
          tasks.length
        )}
      </strong>
      <span className={styles.statistics__heading}>Completed:</span>
      <strong className={styles.statistics__count}>
        {isLoading ? (
          <Loader width={15} height={15} inline={true} />
        ) : (
          completed
        )}
      </strong>
      <span className={styles.statistics__heading}>Active: </span>
      <strong className={styles.statistics__count}>
        {isLoading ? (
          <Loader width={15} height={15} inline={true} />
        ) : (
          tasks.length - completed
        )}
      </strong>
    </div>
  );
};

export default Statistics;
