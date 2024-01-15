import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/style2.css';
import { url } from './components/url';

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function RedirectToRegister() {
    navigate('/register');
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
        navigate("/")
    }
  },[])

  function handleLoginSubmit(event) {
    event.preventDefault();
    console.log(email + ' ' + password);

    // Fetch request code using email and password variables
    fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data accordingly
        console.log(data);
        if (data.success) {
            localStorage.setItem("token",data.token);
            if(rememberMe){
                localStorage.setItem("flag",true);
            }
            navigate("/");
          }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="Login">
      <header className="Login-header">
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleLoginSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMeCheckbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="rememberMeCheckbox">
                  Remember Me
                </label>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                New Here{' '}
                <a className="link-primary" onClick={RedirectToRegister}>
                  Register here?
                </a>
              </p>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default LoginScreen;
