import React from 'react';
import Header from './components/Header';

type PublicLayoutProps = {
  children: React.ReactNode;
};

const MainPageLayout: React.FC<PublicLayoutProps> = ({ children }) => {

  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default MainPageLayout;
