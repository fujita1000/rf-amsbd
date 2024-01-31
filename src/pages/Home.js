// Home.js

import React from 'react';
import AllThread from '../components/Threads/AllThread';
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Home = () => {
  
  return (
    <>
    <HelmetProvider>
    <Helmet>
        <title>RF-AMSBD</title>
        <meta name="description" content="Reactとfirebaseで作成した匿名掲示板" />
    </Helmet>
    </HelmetProvider>
    <div className="container m-auto my-8 w-[95%]">
      <h1 className="text-[24px] font-bold mb-4">匿名掲示板</h1>
      <AllThread />
    </div>
    </>
  );
};

export default Home;