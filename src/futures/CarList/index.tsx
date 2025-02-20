import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useRouter } from 'next/router';
import { getCarList, getResults } from '@/src/enties/Car/gateways';
import Skeleton from '../Skeleton';
import NotFound from '@/src/common/componets/NotFound';
import Modal from '@/src/common/componets/Modal';
import styles from './styles.module.css';
import { filterCars, sortCars } from './utils';
import type CarData from '@/src/enties/Car/types';
import type { SortType } from '@/src/enties/types';
import { CarListType } from '@/src/enties/Car/types';

const CarItem = lazy(() => import('./components/CarItem'));

const CarList = () => {
  const [carList, setCarList] = useState<CarData[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>('default');
  const [_, setIsActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const { makeId, year } = router.query;

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const makeIdInt = parseInt(makeId as string, 10);
        const yearInt = parseInt(year as string, 10);
        const data = (makeId && year) 
          ? await getResults(makeIdInt, yearInt) 
          : await getCarList();
          
        if (JSON.stringify(data) !== JSON.stringify(carList)) {
          setCarList(data);
        }
      } catch (error) {
        console.error('Error fetch', error);
      }
    };
  
    fetchCarList();
  }, [makeId, year]);

  const value = useSelector((state: RootState) => state.search.value);

  const filteredCarList = filterCars(carList, value ?? '');

  const sortedCar = sortCars(filteredCarList, makeId, sortType);

  const toggleButton = () => {
    setIsShow(prevState => !prevState);
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleClickOutside = () => {
    setIsModalOpen(false);
  };

  const handleActive = () => {
    setIsActive(prevState => !prevState);
  };

  const toggleSort = () => {
    setSortOpen(prevState => !prevState);
  };

  const handleSortChange = (type: SortType) => {
    setSortType(type);
    handleActive();
    setSortOpen(false);
  };

  const displayCar = isShow ? sortedCar : sortedCar.slice(0, 30);

  const noResults = value && filteredCarList.length === 0;

  if (noResults) {
    return <NotFound />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {!makeId && (<button className={styles.select} onClick={toggleModal}>
          Select
        </button>)}
        <div className={styles.wrapper}>
          <button className={`${styles.sort} ${makeId && styles.sort_result}`} onClick={toggleSort}>
            <span className={`${styles.sort_text} ${makeId && styles.sort_text_result}`}>Sort</span>
            <i
              className={`fa-solid fa-caret-down ${styles.icon} ${sortOpen ? 'rotate-180' : ''}`}
            ></i>
          </button>
          <ul className={`${styles.sort_list} ${sortOpen ? styles.sort_open : ''}`}>
            <li className={styles.sort_item} onClick={() => handleSortChange('default')}>
              <input
                type="radio"
                name="sort"
                value="default"
                checked={sortType === 'default'}
                onChange={() => handleSortChange('default')}
              />
              Default
            </li>
            <li className={styles.sort_item} onClick={() => handleSortChange('alphabet')}>
              <input
                type="radio"
                name="sort"
                value="alphabet"
                checked={sortType === 'alphabet'}
                onChange={() => handleSortChange('alphabet')}
              />
              Alphabet
            </li>
          </ul>
        </div>
      </div>
      <Suspense fallback={<Skeleton />}>
        <ul className={styles.list}>
          {displayCar.map(car => (
            <CarItem key={'Model_ID' in car ? car.Model_ID : car.MakeId} {...car} />
          ))}
        </ul>
      </Suspense>
      {carList.length > 20 && (<span className={styles.link} onClick={toggleButton}>
        {isShow ? 'Show less car' : 'Show more car'}
      </span>)}
      {isModalOpen && <Modal onModalClick={handleClickOutside} cars={carList as CarListType[]} />}
    </div>
  );
};

export default CarList;
