// Search.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDocs, query, collection, where, db } from '../lib/firebase';
import SearchResults from '../components/Search/SearchResults';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchTerm = new URLSearchParams(location.search).get('term');
    const searchTermLower = searchTerm.toLowerCase();

    const fetchData = async () => {
      if (searchTermLower && searchTermLower.trim() !== '') {
        try {
          const q = query(
            collection(db, 'threads'),
            where('title', '>=', searchTermLower),
            where('title', '<=', searchTermLower + '\uf8ff')
          );
          console.log('Firestore Query:', q);
          
          const querySnapshot = await getDocs(q);

          const results = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter(result => result.title.toLowerCase().includes(searchTermLower));

          console.log('検索結果:', results);
          setSearchResults(results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="container m-auto my-8 w-[95%]">
      <h2>検索結果</h2>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Search;