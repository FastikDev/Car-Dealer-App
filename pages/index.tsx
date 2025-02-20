import React from 'react';
import MainPageLayout from '@/src/layaut/MainPageLayout';
import CarList from '@/src/futures/CarList';
import type { NextPage } from 'next';

const Home: NextPage = () => {

  return (
    <MainPageLayout >
      <CarList />
    </MainPageLayout>
  );
};

export default Home;
