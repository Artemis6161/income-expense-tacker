import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Please enter both email and password");
      return;
    }

    try {
      // Update the login API endpoint with the correct URL
      const response = await axios.post('https://income-expense-tacker.onrender.com/user/login', { email, password });

      const { token, userId, userName } = response.data;

      localStorage.setItem('userName', userName);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);

      toast("Login Successful");
      setIsAuthenticated(true);
      setUserName(userName);

      navigate('/profile');
    } catch (error) {
      toast("Login Failed");
      console.error('Login failed', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Login</button>
      </form>

      <p>Not a member? <Link to="/register">Create an account</Link></p>
    </div>
  );
};

export default Login;
