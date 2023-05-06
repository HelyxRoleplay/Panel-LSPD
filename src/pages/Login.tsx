import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {useLoginMutation} from '../redux/api/authAPI';
import {Button, Checkbox, Form, Input, notification} from 'antd';
import {login, updateUser} from '../redux/features/authSlice';
import {LOCAL_STORAGE} from '../constants/localstorage';
import {socket} from '../socket';

const Login = () => {
    const dispatch = useAppDispatch();
    const [triggerLogin, {data, isLoading, isError, error}] =
        useLoginMutation();
    const [toast, contextHolder] = notification.useNotification();

    const handleLogin = (values: {
        username: string;
        password: string;
        remember: boolean;
    }) => {
        triggerLogin(values)
            .unwrap()
            .then((res) => {
                dispatch(
                    login({
                        authToken: res.token,
                        user: res,
                    }),
                );

                socket.on('updateUser', (data) => {
                    dispatch(updateUser(data));
                });

                if (values.remember) {
                    localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, res.token);
                } else {
                    sessionStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, res.token);
                }
            })
            .catch(() => {
                toast.error({
                    message: 'Erreur',
                    description: 'Prénom Nom ou mot de passe incorrect',
                });
            });
    };

    const handleConnectByToken = useCallback(() => {
        const token = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN);
        if (token) {
            triggerLogin({
                token: token,
            })
                .unwrap()
                .then((res) => {
                    dispatch(
                        login({
                            authToken: res.token,
                            user: res,
                        }),
                    );

                    socket.on('updateUser', (data) => {
                        dispatch(updateUser(data));
                    });
                })
                .catch(() => {
                    toast.error({
                        message: 'Erreur',
                        description: 'Prénom Nom ou mot de passe incorrect',
                    });
                });
        }
    }, [dispatch, toast, triggerLogin]);

    useEffect(() => {
        handleConnectByToken();
    }, [handleConnectByToken]);

    return (
        <>
            {contextHolder}
            Connexion
            <Form onFinish={handleLogin}>
                <Form.Item
                    name="username"
                    label={'Prénom Nom'}
                    rules={[
                        {
                            required: true,
                            message: "Veuillez entrer votre nom d'utilisateur",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={'Mot de passe'}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez entrer votre mot de passe',
                        },
                    ]}
                >
                    <Input type="password" />
                </Form.Item>
                {/* remember me */}
                <Form.Item
                    label="Se souvenir de moi"
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" loading={isLoading}>
                        Se connecter
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;
