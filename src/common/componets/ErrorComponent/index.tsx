import React from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const ErrorComponent = () => {
  const router = useRouter();

  const handleReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.replace(router.asPath);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <img src="/error.png" alt="Error" />
        <h4 className={styles.title}>Unexpected error occurred...</h4>
        <p className={styles.description}>Try again a bit later</p>
        <a href="#" className='link' onClick={handleReload}>
          Reload page
        </a>
      </div>
    </div>
  );
};

export default ErrorComponent;
