// 例: src/components/Home.js

import React from 'react';
import ThreadForm from '../components/ThreadForm';

const Home = () => {
  const handleThreadCreate = (threadText) => {
    console.log(`新しいスレッドを作成: ${threadText}`);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">匿名掲示板</h1>
      <ThreadForm onThreadCreate={handleThreadCreate} />
    </div>
  );
};

export default Home;