import React from 'react';
import styles from './styles.module.css';
import type CarData from '@/src/enties/Car/types';

type CarItemProps = CarData;

const CarItem: React.FC<CarItemProps> = props => {
  const name = 'MakeName' in props ? props.MakeName : props.Make_Name;
  const model = 'Model_Name' in props ? props.Model_Name : null;
  const type = 'VehicleTypeName' in props ? props.VehicleTypeName : null;

  return (
    <div className={styles.card}>
      <h2 className={styles.title} title={name}>
        {name}
      </h2>
      {model && <p className={styles.text}>{model}</p>}
      {type && <p className={styles.text}>{type}</p>}
    </div>
  );
};

export default CarItem;
