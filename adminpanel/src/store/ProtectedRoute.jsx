import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth'; // Adjust the path as needed
import { toast } from 'react-toastify';
const ProtectedRoute = ({ children }) => {
    const { isAdminLoggedIn } = useAuth();

    if (!isAdminLoggedIn) {
        toast.warn('Please log in first');
        return <Navigate to="/adminlogin" replace />;
    }

    return children;
};

export default ProtectedRoute;
