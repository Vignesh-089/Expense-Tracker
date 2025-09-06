import React from 'react';
import { Navigate } from 'react-router-dom';
// import SignUp from '../pages/Auth/signin';
import MainLayout from '../layout/MainLayout';
import ExpenseTrackerRegistration from '../components/authPage/register';

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
        // {
        //     path: 'pages/signUp',
        //     element: <SignUp />
        // }
    ]
};

export default AuthenticationRoutes;
