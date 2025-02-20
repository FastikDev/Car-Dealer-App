import React from 'react';
import styles from './styles.module.css';

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <ul className={styles.list}>
        {Array.from({ length: 30 }).map((_, i) => (
          <li key={i}>
            <div className={styles.card} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skeleton;
