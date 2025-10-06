import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // If user exists, render the protected component, else redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
