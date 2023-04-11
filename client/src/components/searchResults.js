import React from 'react';
import '../App.css';
import './searchResults.css';

function SearchResults({ searchResults, addFavoritePainting }) {
  const handleFavoriteClick = (painting) => {
    addFavoritePainting(painting);
  };

  return (
    <div className='search--result--main--continer'>
      {searchResults.map((painting) => (
        <div key={painting.id} className="search--img--container">
          <img src={painting.imageUrl} alt={painting.title} className="search--img--result" />
          <h3>{painting.title}</h3>
          <p>Artist: {painting.artist}</p>
          <button onClick={() => handleFavoriteClick(painting)}>Add to favorites</button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
