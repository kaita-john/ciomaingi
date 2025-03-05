// ProtectedRoute.jsx
import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "./AuthContext"; // Adjust path as needed

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;