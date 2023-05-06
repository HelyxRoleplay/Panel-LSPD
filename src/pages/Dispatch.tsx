import React, {useEffect, useState} from 'react';
import {Button, Typography} from 'antd';
import DispatchTable from '../components/dispatch/tables/DispatchTable';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {socket} from '../socket';
import {setIsAvailable} from '../redux/features/authSlice';
import DispatchAdmin from '../components/dispatch/DispatchAdmin';
import PatrolModal from '../components/dispatch/modals/PatrolModal';

function Dispatch() {
    const [patrol, setPatrol] = useState(false);
    const {isAvailable, isAdmin, badges} = useAppSelector(
        (state) => state.auth.user,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('available', (data) => {
            dispatch(setIsAvailable(data));
        });
    }, [dispatch]);

    const handleDonePatrol = () => {
        socket.emit('updateUser', {
            badges: [],
        });
    };

    return (
        <>
            <Typography.Title level={2}>Dispatch</Typography.Title>

            {isAdmin && <DispatchAdmin />}

            <PatrolModal onClose={() => setPatrol(false)} visible={patrol} />

            <Button
                onClick={() => {
                    socket.emit('available', {
                        state: !isAvailable,
                    });
                }}
            >
                {isAvailable ? 'Se retirer du service' : 'Se mettre en service'}
            </Button>

            <Button
                onClick={
                    badges.length === 0
                        ? () => setPatrol(true)
                        : handleDonePatrol
                }
            >
                {badges.length === 0
                    ? 'Démarrer une patrouille'
                    : 'Terminer une patrouille'}
            </Button>
            <DispatchTable />
        </>
    );
}

export default Dispatch;
