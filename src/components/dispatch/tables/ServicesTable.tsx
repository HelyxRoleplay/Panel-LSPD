import React from 'react';
import {Table, Badge, Button} from 'antd';
import {useAppSelector} from '../../../redux/hooks';
import {socket} from '../../../socket';

const ServicesTable = () => {
    const {services} = useAppSelector((state) => state.dispatch);

    const handleDeleteService = (id: string) => {
        socket.emit('deleteService', {
            serviceId: id,
        });
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Nom',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Couleur',
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => (
                <Badge color={color} text={color} style={{color: color}} />
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (a: any, service: any) => (
                <>
                    <Button onClick={() => handleDeleteService(service._id)}>
                        Supprimer
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={services}
                pagination={{pageSize: 5}}
            />
        </>
    );
};

export default ServicesTable;
