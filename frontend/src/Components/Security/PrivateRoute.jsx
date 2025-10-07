import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check for JWT token in localStorage
  const token = localStorage.getItem("token"); // or use AuthContext

  if (!token) {
    // User is not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in → allow access
  return children;
};

export default PrivateRoute;
