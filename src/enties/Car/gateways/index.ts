import { CarListType, CarYear } from '../types';

export const getCarList = async (): Promise<CarListType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}GetMakesForVehicleType/car?format=json`,
  );

  if (!response.ok) {
    throw new Error(`Error fetch: ${response.status}`);
  }

  const { Results } = await response.json();
  return Results;
};

export const getResults = async (makeId: number, year: number): Promise<CarYear[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );

  if (!response.ok) {
    throw new Error(`Error Fetching: ${response.status}`);
  }

  const { Results } = await response.json();

  return Results;
};
