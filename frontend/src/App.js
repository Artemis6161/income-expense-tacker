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
// import { AuthProvider } from './components/AuthContext';
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
  

  
  const [totalExpense, setTotalExpense] = useState(0);
  const [updatedExpenseEntries, setUpdatedExpenseEntries] = useState([]);

//   const fetchExpenses = async () => {
//     const token = localStorage.getItem("authToken"); 
//     if (!token) {
//         console.log("No token found. Please ensure the user is logged in.");
//         return;
//     }

//     try {
//       const response = await axios.get('http://localhost:5000/api/expense', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//         const expenseEntries = response.data;
//         setUpdatedExpenseEntries(expenseEntries);
//         const newTotalExpense = expenseEntries.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
//         setTotalExpense(newTotalExpense);
//     } catch (error) {
//         console.error('Error fetching expense entries:', error.response || error);
//         if (error.response && error.response.status === 403) {
//             console.log("Forbidden: Invalid or expired token.");
//             // Optional: Redirect to login page or show message
//             setIsAuthenticated(false);
//         }
//     }
// };

const fetchExpenses = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
      console.log("No token found. Redirecting to login.");
      // Redirect to login page
      return;
  }

  try {
      const response = await axios.get('http://localhost:5000/api/expense', {
          headers: { Authorization: `Bearer ${token}` },
      });
      // Process response data
  } catch (error) {
      if (error.response && error.response.status === 403) {
          console.error(error.response.data.message);
          if (error.response.data.message === 'Token expired. Please log in again.') {
              localStorage.removeItem("authToken"); // Clear expired token
              // Redirect to login page
          }
      } else {
          console.error('Error fetching expenses:', error);
      }
  }
};

  
  
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchExpenses();
    } else {
      console.log("No token found. Please ensure the user is logged in.");
    }
  }, []);
  
  const totalIncome = 1000; // Example total income
  const monthlyExpenses = {
    '2024-09': { food: 200, entertainment: 150, shopping: 100 },
    '2024-10': { food: 250, entertainment: 50, shopping: 80 },
    '2024-11': { food: 300, entertainment: 100, shopping: 60 },
  };
  

  return (
   <>
    <ToastContainer />
  
    <Router>
    
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userName={userName} setUserName={setUserName}/>
      
      <Routes>
   <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard monthlyExpenses={monthlyExpenses} totalIncome={totalIncome}/>
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
              <Expense totalExpense={totalExpense} fetchExpenses={fetchExpenses} updatedExpenseEntries={updatedExpenseEntries}/>
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




