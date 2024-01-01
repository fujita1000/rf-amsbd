// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Layout from '../components/Layout/Layout'; 
import Home from '../pages/Home';
import Thread from '../pages/Thread'; 
import Search from '../pages/Search';

function App() {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="threads/:threadId" element={<Thread />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;