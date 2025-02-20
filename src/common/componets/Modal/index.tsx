import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { years } from '../../utils';
import styles from './styles.module.css';
import { CarListType } from '@/src/enties/Car/types';

interface ModalProps {
  onModalClick: () => void;
  cars: CarListType[];
}

const Modal: React.FC<ModalProps> = ({ onModalClick, cars }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const findCardId = (name: string) => {
    const carId = cars.find(car => car.MakeName.toLowerCase() === name.toLowerCase());
    return carId ? carId.MakeId : null;
  };
  
  const toggleYear = () => {
    setIsOpen(prev => !prev);
  };

  const handleYear = (year: string) => {
    setSelectedYear(year);
    toggleYear();
  };

  
  const handleNextClick = () => {
    const carId = findCardId(value);
    if (carId && selectedYear) {
      onModalClick();
      router.push(`/result/${carId}/${selectedYear}/`);
    }
  };

  const handleClickClose = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (
      target.classList.contains(styles.close_desctope) ||
      target.classList.contains(styles.close_mobile)
    ) {
      onModalClick();
    }
  };

  const validation = value 
  ? cars.some(car => car.MakeName?.toLowerCase().startsWith(value.toLowerCase())) 
  : true;

  return (
    <div className={`${styles.modal} ${styles.overlay}`}>
      <div className={styles.content}>
        <button className={styles.close_desctope} onClick={handleClickClose}>
          X
        </button>
        <button className={styles.close_mobile} onClick={handleClickClose}></button>
        <div className={styles.selected}>
          <input
            className={`${styles.car_input} ${!validation ? styles.input_error : ''}`}
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="mark name"
          />
          {!validation && (<span className={styles.validation_text}>wrong name</span>)}
          <div className={styles.btn_box}>
            <div className={styles.year_wrap}>
              <button className={styles.year_btn} onClick={toggleYear}>
                {selectedYear || 'Year'}
                <i
                  className={`fa-solid fa-caret-down ${styles.icon} ${isOpen ? 'rotate-180' : ''}`}
                ></i>
              </button>
              <ul className={`${styles.year_list} ${isOpen ? styles.active : ''}`}>
                {years.map(year => (
                  <li
                    className={styles.year}
                    key={year}
                    onClick={() => handleYear(year.toString())}
                  >
                    <input type="radio" checked={selectedYear === year.toString()} readOnly />
                    <span className={styles.year_value}>{year}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={styles.next}
              disabled={!selectedYear || value === ''}
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Modal), { ssr: false });
