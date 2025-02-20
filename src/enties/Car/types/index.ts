export type CarListType = {
  MakeId: number;
  MakeName: string;
  VehicleTypeName: string;
};

export type CarYear = {
  Model_ID: number;
  Make_Name: string;
  Model_Name: string;
};

type CarData = CarListType | CarYear

export default CarData;
