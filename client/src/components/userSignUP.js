import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userSignUP.css'
import splashDesktop from '../asset/sign_up_splash.png'

axios.defaults.baseURL = 'http://localhost:8080';

const SignUpForm = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/api/users/signup', JSON.stringify({
        email,
        password,
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      alert('Sign up successful!');
      setLoggedIn(true);
      localStorage.setItem('userId', response.data._id); // save userId into local storage
      navigate('/search')
    } catch (error) {
      console.error(error);
      alert('Sign up failed!');
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/api/users/signin', {email, password,});
      console.log(response.data);
      alert('Sign in successful!');
      setLoggedIn(true);
      localStorage.setItem('userId', response.data._id); // save userId into local storage
      navigate('/search');
    } catch (error) {
      console.error(error);
      alert('Sign in failed!');
    }
  };

  return (
    <div className='page--container'>
      <div className="image-container">
        <img className='splash--image' src={splashDesktop} alt="" srcset="" />
      </div>
      <div className="form-container">
        <h2 className='txt--600'>Sign Up / Sign In</h2>
        <form>
          <label>
            <p>Email:</p>
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleSignIn}>Sign In</button>
        </form>
      </div>
    </div>

  );
};

export default SignUpForm;
