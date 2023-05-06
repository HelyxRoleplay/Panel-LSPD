import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import {ConfigProvider, theme} from 'antd';
import {useAppSelector} from './redux/hooks';

const ThemeProvider = ({}) => {
    const {isDarkMode} = useAppSelector((state) => state.auth);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#5a89ff',
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider />
        </Provider>
    </React.StrictMode>,
);
