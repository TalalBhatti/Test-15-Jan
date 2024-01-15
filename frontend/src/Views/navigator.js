import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import RegisterScreen from './regsiter';
import LoginScreen from './login';
import LandingScreen from "./landingPage";
import React, {useEffect} from "react";

function App() {
  const isUserLoggedIn = !!localStorage.getItem('token');
  const isSaved = !!localStorage.getItem('flag');

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        {/* If user is logged in, navigate to LandingScreen, otherwise, navigate to LoginScreen */}
        {isUserLoggedIn || isSaved ? (
          <Route path="/" element={<LandingScreen />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
