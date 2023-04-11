import React from 'react';
import { Link } from 'react-router-dom';

const UserStatus = ({ loggedIn, setLoggedIn }) => {
  const handleSignOut = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <Link to="/favorites">
            <button>View Favorites</button>
          </Link>
        </div>
      ) : (
        <p>Please sign in to use the application.</p>
      )}
    </div>
  );
};

export default UserStatus;
