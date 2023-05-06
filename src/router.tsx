import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import routes from './constants/routes';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Dispatch from './pages/Dispatch';

const router = createBrowserRouter([
    {
        path: routes.LOGIN,
        element: <Login />,
    },
    {
        path: routes.DASHBOARD,
        element: <ProtectedRoute component={Layout} />,
        children: [
            {
                path: routes.DASHBOARD,
                element: <Dashboard />,
            },
            {
                path: routes.DISPATCH,
                element: <Dispatch />,
            },
        ],
    },
]);

export default router;
