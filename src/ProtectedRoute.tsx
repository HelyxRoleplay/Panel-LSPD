import React from 'react';
import {useAppSelector} from './redux/hooks';
import Login from './pages/Login';

const ProtectedRoute: React.FC<{component: React.FC}> = ({
    component: Component,
}: any) => {
    const {isConnected} = useAppSelector((state) => state.auth);
    return isConnected ? <Component /> : <Login />;
};

export default ProtectedRoute;
