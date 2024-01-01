// src/components/SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
const SearchResults = ({ results }) => {

  return (
    <div>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
           <Link to={`/threads/${result.id}`}>
            {result.title}
            </Link>
        </li>  
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;