import type CarData from '@/src/enties/Car/types';
import { SortType } from '@/src/enties/types';

export const filterCars = (carList: CarData[], searchValue: string): CarData[] => {
  const lowerCaseSearchValue = searchValue ? searchValue.toLowerCase() : '';

  return carList.filter(car => {
    const makeName = 'MakeName' in car ? car.MakeName.toLowerCase() : '';
    const modelName = 'Model_Name' in car ? car.Model_Name.toLowerCase() : '';
    return makeName.startsWith(lowerCaseSearchValue) || modelName.startsWith(lowerCaseSearchValue);
  });
};


type KeyOfCarData = 'MakeName' | 'Model_Name';

const compareByKey = (key: KeyOfCarData) => (a: CarData, b: CarData) => {
  const aValue = key in a ? (a[key as keyof CarData] as string) : '';
  const bValue = key in b ? (b[key as keyof CarData] as string) : '';
  return aValue.localeCompare(bValue);
};

export const sortCars = (
  carList: CarData[],
  makeId: string | string[] | undefined,
  sortType: SortType
): CarData[] => {
  const sortedList = [...carList];
  const keyToSortBy = makeId ? 'Model_Name' : 'MakeName';

  const sort = sortType === 'alphabet'
    ? sortedList.sort(compareByKey(keyToSortBy))
    : sortedList;

  return sort;
};