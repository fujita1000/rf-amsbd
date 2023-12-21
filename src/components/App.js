// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Home from '../pages/Home';

function App() {
  return (
    <Router>
      <div>
        <header className="flex justify-center items-center text-[40px] font-bold w-screen h-[60px] bg-blue-300">
          <h1 className='mr-[40px]'>RF-AMSBD</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;