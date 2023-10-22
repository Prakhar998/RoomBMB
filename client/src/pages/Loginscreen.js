import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'

function Loginscreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      setLoading(false);
  
      if (response.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href = '/home';
      } else {
        // Display an error message for failed login
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  }
  

  return (
    <div>
       {loading && (<Loader />)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 ">
        {error && (<Error message='Invalid credentials!' />)}
          <div className="bs">
            <h2>Login !</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={Login}>
              Submit
            </button>
            <div className="navbar-nav ">
              <a className="nav-link link-primary" href="/register">
                Don`t have account ? Register here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
