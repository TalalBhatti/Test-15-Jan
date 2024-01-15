import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/login.css'; // Create a styling file for your home page

const LandingScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('TestUser');

  const handleLogout = () => {
    console.log("check this")
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Home-container">
            <div>
              <h3>Welcome to the Home Page, {userName}!</h3>
              <img
                src="https://via.placeholder.com/400x200" // Replace with the URL of your greeting image
                alt="Greetings"
                className="home-image"
              />
              <p>You are logged in as {userName}.</p>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </div>
        </div>
      </header>
    </div>
  );
};

export default LandingScreen;
