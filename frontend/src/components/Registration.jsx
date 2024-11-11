import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {   useNavigate,Link } from 'react-router-dom';
function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    // const notify = () => toast("Registration Successful");

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();

        const payload = {
            name: userName,
            email: email,
            password: password
        }

        axios.post('https://income-expense-tacker.onrender.com/user/login', payload)
            .then((res) => {
                setLoading(false)
                toast("Registration Successful");
                console.log("User register", res);
                navigate('/login');
            })
            .catch((err) => {
                toast("Registration Failed");
                console.log("Error while reiteration", err)
                setLoading(false)
            })

    };

    return (
        <div className="auth-container">
      <h2>Register</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
      <input 
          type="username" 
           placeholder='UserName'
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder='email'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
      
        <input 
          type="password" 
           placeholder='password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
         {/* <input 
          type="password" 
           placeholder='confirmPassword'
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        /> */}
        
        
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    )
}

export default Registration