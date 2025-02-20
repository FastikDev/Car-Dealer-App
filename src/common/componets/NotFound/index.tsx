"use client";

import React from 'react';
import styles from './styles.module.css';

const NotFound = () => (
  <div className={styles.main}>
    <div className={styles.content}>
      <img src="/search.png" alt="Search" />
      <h4 className={styles.title}>We didn't find nothing</h4>
      <p className={styles.description}>Try to adjust your request</p>
    </div>
  </div>
);

export default NotFound;
