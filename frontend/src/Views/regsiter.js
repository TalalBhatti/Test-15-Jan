import React, { useState } from "react";
import './styling/style2.css';
import { useNavigate } from "react-router-dom";
import { url } from "./components/url";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function RedirectToLogin() {
    navigate("/login");
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();

    // Fetch request code for user registration
    fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:fullName,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
            alert("Registration successful! Please log in.");
            // Redirect to login page after the alert is closed
            setTimeout(() => {
              navigate("/");
            }, 0);
          }
          if (!data.success) {
            alert(data.message);
          }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error);
      });
  }

  return (
    <div className="App">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleRegisterSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <a className="link-primary" onClick={RedirectToLogin}>
                Sign In
              </a>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3" style={{ paddingBottom: '20px' }}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
