import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SearchResults from './components/searchResults';
import LandingPage from './components/landingPage';
import UserSignup from './components/userSignUP';
import UserStatus from './components/userStatus';
import FavoritePaintings from './components/FavouritePaintings';
import './App.css';

function SearchForm({ handleSearch, searchTerm, setSearchTerm }) {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoritePaintings, setFavoritePaintings] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn === 'true';
  });

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://art-search-server.onrender.com/search?q=${searchTerm}`);
    setSearchResults(response.data);
  };

  const addFavoritePainting = async (painting) => {
    const userId = localStorage.getItem('userId');
    const user = await axios.get(`/api/users/${userId}`);
    const isPaintingAlreadyFavorited = user.data.favoritePaintings.some(
      (favPainting) => favPainting.id === painting.id
    );
  
    if (isPaintingAlreadyFavorited) {
      alert('Painting is already in favorites!');
    } else {
      await axios.post(`/api/users/add-favorite/${userId}`, painting);
      alert('Painting added to favorites!');
      setFavoritePaintings((prevFavorites) => [...prevFavorites, painting]);
    }
  };
  

  const handleSearchRoute = () => {
    if (!loggedIn) {
      return <Navigate to="/" replace onError={() => alert('Please sign in to access the search page.')} />;
    }
    return (
      <>
        <SearchForm
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <SearchResults searchResults={searchResults} addFavoritePainting={addFavoritePainting} />
      </>
    );
  };

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    const fetchFavoritePaintings = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`/api/users/${userId}/favorites`);
        setFavoritePaintings(response.data);
      }
    };
  
    fetchFavoritePaintings();
  }, []);
  
  const removeFavoritePainting = async (paintingId) => {
    const userId = localStorage.getItem('userId');
    await axios.post(`/api/users/remove-favorite/${userId}`, { paintingId });
    alert('Painting removed from favorites!');
    setFavoritePaintings((prevFavorites) => prevFavorites.filter((painting) => painting.id !== paintingId));
  };
  
  return (
    <Router>
      <UserStatus loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/search" /> : <LandingPage setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<UserSignup setLoggedIn={setLoggedIn} />} />
        <Route path="/search" element={handleSearchRoute()} />
        <Route path="/favorites" element={<FavoritePaintings favoritePaintings={favoritePaintings} removeFavorite={removeFavoritePainting}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

