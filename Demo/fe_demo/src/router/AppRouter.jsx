import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Home from '../pages/homepage';
import Register from '../components/Register';


// Protected Route Component
function ProtectedRoute({ element }) {
    const { isAuthenticated, state } = useAuth();
    
    const hasToken = localStorage.getItem('authToken');
    const isUserLoggedIn = hasToken || isAuthenticated;

    if (!isUserLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return element;
}

export default function AppRouter() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AuthProvider>
    );
}