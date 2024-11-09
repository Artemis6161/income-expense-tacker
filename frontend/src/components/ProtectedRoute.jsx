// // PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// // Function to check if user is authenticated (localStorage for this example)
// const isAuthenticateds = () => {
//   const token = localStorage.getItem('authToken');
//   return !!token; // Check if token exists
// };

// const PrivateRoute = ({ children }) => {
//   return isAuthenticateds() ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // If the token doesn't exist, redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;







