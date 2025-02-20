import React, { useEffect } from 'react';
import MainPageLayout from '@/src/layaut/MainPageLayout';
import CarList from '@/src/futures/CarList';
import type { NextPage } from 'next';
import { getStaticPaths, getStaticProps } from '@/src/enties/utils';
import { useDispatch } from 'react-redux';
import { setModelName } from '@/src/redux/slises/modelSlice';

const ResultPage: NextPage<{ makeName: string }> = ({ makeName }) => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setModelName(makeName));
  }, [dispatch, makeName]);

  return (
    <MainPageLayout>
      <CarList />
    </MainPageLayout>
  );
};

export { getStaticPaths, getStaticProps };
export default ResultPage;
