import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import ErrorBoundary from '@/src/common/componets/ErrorBundary';
import NetworkListener from '@/src/common/componets/NetworkListener';
import '../styles/global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Car Dealer</title>
        <meta name="description" content="Car Dealership App" />
        <link rel="icon" href="/car.ico" />
      </Head>
      <Provider store={store}>
        <NetworkListener />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </>
  );
};

export default MyApp;
