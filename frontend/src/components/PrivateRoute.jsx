// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists in localStorage

  // If token does not exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (Dashboard)
  return children;
};

export default PrivateRoute;
