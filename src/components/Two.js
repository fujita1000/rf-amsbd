// components/Two.js
import React from 'react';
import { Link } from 'react-router-dom';

const Two = () => {
  return (
    <div>
      <h2>Page Two</h2>
      <nav>
        <ul>
          <li><Link to="/two/one">Two One</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Two;