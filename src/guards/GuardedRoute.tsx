import React from 'react'
import { Navigate } from 'react-router-dom'

export const GuardedRoute = ({ auth, children }) => {
    if (auth) {
        return children
    }
    return <Navigate to="/auth/login" />
}


export const TeacherGuardedRoute = ({ auth, role, children }) => {
    if (auth && role === 'Profesor') {
        console.log('wiiii')
        return children;
    }
    return <Navigate to="/auth/login" />;
};