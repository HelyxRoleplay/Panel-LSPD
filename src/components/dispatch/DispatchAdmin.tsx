import React, {useEffect, useState} from 'react';
import {socket} from '../../socket';
import {Button, Card} from 'antd';
import BadgesModal from './modals/BagdesModal';
import ServicesModal from './modals/ServicesModal';
import RanksModal from './modals/RanksModal';

const DispatchAdmin = () => {
    const [badges, setBadges] = useState(false);
    const [ranks, setRanks] = useState(false);
    const [services, setServices] = useState(false);

    const toggleBadges = (state: boolean) => () => {
        setBadges(state);
    };

    const toggleRanks = (state: boolean) => () => {
        setRanks(state);
    };

    const toggleServices = (state: boolean) => () => {
        setServices(state);
    };

    return (
        <>
            <BadgesModal visible={badges} onClose={toggleBadges(false)} />
            <RanksModal visible={ranks} onClose={toggleRanks(false)} />
            <ServicesModal visible={services} onClose={toggleServices(false)} />
            <Card title="Administration">
                <Button onClick={toggleBadges(true)}>Gérer les badges</Button>

                <Button onClick={toggleRanks(true)}>Gérer les grades</Button>

                <Button onClick={toggleServices(true)}>
                    Gérer les services
                </Button>
            </Card>
        </>
    );
};

export default DispatchAdmin;
