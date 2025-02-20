import { GetStaticPaths, GetStaticProps } from 'next';
import { getCarList } from "@/src/enties/Car/gateways";
import { CarListType } from "@/src/enties/Car/types";
import { years } from "@/src/common/utils";

const carList: CarListType[] = await getCarList();

async function generateStaticParams() {
  try {
    return carList.flatMap(car => 
      years.map(year => ({
        params: {
          makeId: car.MakeId.toString(),
          year: year.toString(),
        },
      }))
    );
  } catch (error) {
    console.error('Error fetching static params:', error);
    return [];
  }
}

const getNameById = (makeId: number, cars: CarListType[]): string | null => {
  const car = cars.find(car => car.MakeId === makeId);
  return car ? car.MakeName : null;
} 

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await generateStaticParams();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makeId = parseInt(params?.makeId as string);
  const makeName = getNameById(makeId, carList);

  return {
    props: {
      makeName,
    },
    revalidate: 60,
  };
};

