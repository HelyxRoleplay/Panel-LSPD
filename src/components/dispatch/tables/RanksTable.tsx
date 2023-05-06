import React from 'react';
import {Table, Badge, Button} from 'antd';
import {useAppSelector} from '../../../redux/hooks';
import {socket} from '../../../socket';

const RanksTable = () => {
    const {ranks} = useAppSelector((state) => state.dispatch);

    const handleDeleteRank = (id: string) => {
        socket.emit('deleteRank', {
            rankId: id,
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
            render: (a: any, rank: any) => (
                <>
                    <Button onClick={() => handleDeleteRank(rank._id)}>
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
                dataSource={ranks}
                pagination={{pageSize: 5}}
            />
        </>
    );
};

export default RanksTable;
