import React from 'react';
import {Table, Badge, Button} from 'antd';
import {useAppSelector} from '../../../redux/hooks';
import {socket} from '../../../socket';

const BadgesTable = () => {
    const {badges} = useAppSelector((state) => state.dispatch);

    const handleDeleteBadge = (id: string) => {
        socket.emit('deleteBadge', {
            badgeId: id,
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
            render: (a: any, badge: any) => (
                <>
                    <Button onClick={() => handleDeleteBadge(badge._id)}>
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
                dataSource={badges}
                pagination={{pageSize: 5}}
            />
        </>
    );
};

export default BadgesTable;
