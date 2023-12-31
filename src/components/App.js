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

function App() {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:threadId" element={<Thread />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;