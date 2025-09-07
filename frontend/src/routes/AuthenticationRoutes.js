import React from 'react';
import { Navigate } from 'react-router-dom';
// import SignUp from '../pages/Auth/signin';
import MainLayout from '../layout/MainLayout';
import ExpenseTrackerRegistration from '../components/authPage/register';
import LogIn from '../components/authPage/logIn';

const AuthenticationRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="/register" replace />
        },
        {
            path: 'register',
            element: <ExpenseTrackerRegistration />
        },
        {
            path: 'login',
            element: <LogIn />
        },
        // {
        //     path: 'pages/signUp',
        //     element: <SignUp />
        // }
    ]
};

export default AuthenticationRoutes;
