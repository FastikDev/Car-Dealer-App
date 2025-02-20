import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { setSearchValue, clearSearchValue } from '@/src/redux/slises/searchSlice';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Link from 'next/link';

const Header = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.search.value);
  const selectedCar = useSelector((state: RootState) => state.model.name);
  const isOnline =  useSelector((state: RootState) => state.network.status);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const router = useRouter();
  const { makeId, year } = router.query;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(clearSearchValue());
    setIsFocused(false);
  };

  return (
    <header className={`${styles.header} ${!isOnline ? styles.offline : ''}`}>
      {makeId && (
        <Link href='/'>
          {isOnline && (<i className={`fa-solid fa-arrow-left ${styles.back_btn}`}></i>)}
        </Link>
      )}
      {!makeId && (
        <div className={styles.title_container}>
          <h1 className={styles.title_text}>Car Dealer</h1>
          <i className={`fa-solid fa-car ${styles.title_icon}`}></i>
        </div>
      )}
      {makeId && isOnline && (
        <h1 className={styles.car_title}>
          {selectedCar?.toUpperCase()}
          <span className={styles.car_year}>{year}</span>
        </h1>
      )}
      {!isOnline && (<div className={styles.network}>
        <h2 className={styles.network_title}>Unable to load data</h2>
        <p className={styles.network_description}>Check your internet connection.</p>
      </div>)}
      {isOnline && (<div className={styles.container}>
        <div className={styles.input_container}>
          <i className={`fa-solid fa-magnifying-glass ${styles.icon} ${styles.icon_search} ${isFocused ? styles.focused : ''}`}></i>
          <input
            type="text"
            placeholder={makeId ? 'Enter model name..' : 'Enter car name...'}
            value={value}
            onFocus={handleFocus}
            onChange={handleInputChange}
            className={styles.input}
          />
          {value && (
            <i className={`fa-solid fa-xmark ${styles.icon} ${styles.icon_cancel}`} onMouseDown={handleCancel}></i>
          )}
        </div>
      </div>)}
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
