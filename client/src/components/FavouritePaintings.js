import React, { useEffect, useState } from 'react';
import './FavouritePaintings.css'

const FavoritePaintings = ({ favoritePaintings, removeFavorite }) => {
  const [displayedFavorites, setDisplayedFavorites] = useState(favoritePaintings);

  useEffect(() => {
    setDisplayedFavorites(favoritePaintings);
  }, [favoritePaintings]);

  const handleRemoveClick = (paintingId) => {
    removeFavorite(paintingId);
  };

  return (
    <div>
      <h2>Favorite Paintings</h2>
      {displayedFavorites.length > 0 ? (
        <ul>
          {displayedFavorites.map((painting) => (
            <li key={painting.id}>
              <img src={painting.imageUrl} alt={painting.title} />
              <h3>{painting.title}</h3>
              <p>{painting.artist}</p>
              <button onClick={() => handleRemoveClick(painting.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite paintings 	(҂◡_◡) ᕤ</p>
      )}
    </div>
  );
};

export default FavoritePaintings;
