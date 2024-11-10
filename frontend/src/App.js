import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Income from "./components/Income"
import Expense from "./components/Expense"
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar"
import Login from "./components/login";
import Register from "./components/Registration"
import Profile from "./components/Profile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');
    if (token) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

return (
   <>
    <ToastContainer />
  
    <Router>
    
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userName={userName} setUserName={setUserName}/>
      
      <Routes>
   <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
          <Route
          path="/income"
          element={
            <PrivateRoute>
              <Income  />
            </PrivateRoute>
          }
        />
            <Route
          path="/expense"
          element={
            <PrivateRoute>
              <Expense />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} setUserName={setUserName} userName={userName}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/profile" element={ <Profile setUserName={setUserName}/> }/>

      </Routes>
    </Router>
    
   </>
  )
}

export default App




