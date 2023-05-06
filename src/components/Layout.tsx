import React from 'react';
import {Outlet} from 'react-router-dom';
import {Layout} from 'antd';
import Sidebar from '../components/Sidebar';
import {useAppSelector} from '../redux/hooks';

const CustomLayout = () => {
    const {isDarkMode} = useAppSelector((state) => state.auth);

    return (
        <Layout hasSider>
            <Sidebar />

            <Layout
                style={{
                    backgroundColor: isDarkMode ? '#0e1a3d' : '#e3ebff',
                }}
            >
                <Layout.Content>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
