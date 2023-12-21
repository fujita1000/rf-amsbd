// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import One from './components/One';  
import Two from './components/Two';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/one">Page One</Link></li>
              <li><Link to="/two">Page Two</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/one" element={<One />} />  
          <Route path="/two" element={<Two />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;