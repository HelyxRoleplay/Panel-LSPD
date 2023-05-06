import React, {useEffect, useState} from 'react';
import {socket} from '../../../socket';
import {Table, Badge, theme, Button, Popconfirm} from 'antd';
import {FiPlusCircle, HiStatusOffline, HiStatusOnline} from 'react-icons/all';
import AddBadgeModal from '../modals/AddBadgeModal';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
    addBadge,
    addRank,
    addService,
    setBadges,
    setDispatch,
    setRanks,
    setServices,
    updateMember,
} from '../../../redux/features/dispatchSlice';
import AddRankModal from '../modals/AddRankModal';
import AddServiceModal from '../modals/AddServiceModal';
import {ColumnsType} from 'antd/es/table';

interface dispatch {
    id: string;
    username: string;
    isAdmin: boolean;
    isAvailable: boolean;
    phone: string;
    bank: string;
    note: string;
    badges: string[];
    ranks: string[];
    services: string[];
}

const DispatchTable = () => {
    const {members, badges, ranks, services} = useAppSelector(
        (state) => state.dispatch,
    );
    const {isAdmin} = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const [addBadgeModalVisible, setAddBadgeModalVisible] =
        useState<dispatch | null>(null);
    const [addRankModalVisible, setAddRankModalVisible] =
        useState<dispatch | null>(null);
    const [addServiceModalVisible, setAddServiceModalVisible] =
        useState<dispatch | null>(null);

    const {
        token: {colorPrimary},
    } = theme.useToken();

    useEffect(() => {
        socket.on('getDispatch', (data) => {
            dispatch(setDispatch(data));
        });
        socket.on('updateOtherDispatchUser', (data) => {
            dispatch(updateMember(data));
        });
        socket.on('newBadge', (badge) => {
            dispatch(addBadge(badge));
        });
        socket.on('newRank', (rank) => {
            dispatch(addRank(rank));
        });
        socket.on('newService', (service) => {
            dispatch(addService(service));
        });
        socket.on('getAllBadges', (badges) => {
            dispatch(setBadges(badges));
        });
        socket.on('getAllRanks', (ranks) => {
            dispatch(setRanks(ranks));
        });
        socket.on('getAllServices', (services) => {
            dispatch(setServices(services));
        });

        socket.emit('getDispatch');

        return () => {
            socket.off('getDispatch');
            socket.off('updateOtherDispatchUser');
            socket.off('newBadge');
            socket.off('newRank');
            socket.off('newService');
            socket.off('getAllBadges');
            socket.off('getAllRanks');
            socket.off('getAllServices');
        };
    }, [dispatch, socket.connected]);

    const handleRemoveBadge = (member: dispatch, badge: string) => {
        socket.emit('updateOtherUser', {
            id: member.id,
            newData: {
                badges: member.badges.filter((b) => b !== badge),
            },
        });
    };

    const handleRemoveRank = (member: dispatch, rank: string) => {
        socket.emit('updateOtherUser', {
            id: member.id,
            newData: {
                ranks: member.ranks.filter((b) => b !== rank),
            },
        });
    };

    const handleRemoveService = (member: dispatch, service: string) => {
        socket.emit('updateOtherUser', {
            id: member.id,
            newData: {
                services: member.services.filter((b) => b !== service),
            },
        });
    };

    const columns: ColumnsType<dispatch> = [
        {
            title: 'En Service',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            render: (isAvailable: boolean) => (
                <span>
                    {isAvailable ? (
                        <HiStatusOnline color={colorPrimary} size={20} />
                    ) : (
                        <HiStatusOffline size={20} />
                    )}
                </span>
            ),
            sorter: (a: dispatch, b: dispatch) =>
                a.isAvailable === b.isAvailable ? -1 : a.isAvailable ? -1 : 1,
            defaultSortOrder: 'ascend',
            filters: [
                {
                    text: 'En service',
                    value: true,
                },
                {
                    text: 'Hors service',
                    value: false,
                },
            ],
            onFilter: (value: any, record: any) => record.isAvailable === value,
        },
        {
            title: 'Prénom nom',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Grades',
            dataIndex: 'ranks',
            key: 'ranks',
            render: (userRanks: string[], member: dispatch) => (
                <>
                    {userRanks.map((rank: string) => {
                        const rankData = ranks.find((b: any) => b._id === rank);

                        if (isAdmin) {
                            return (
                                <Popconfirm
                                    key={rank}
                                    title={`Supprimer ${rankData?.label} ?`}
                                    onConfirm={() =>
                                        handleRemoveRank(member, rank)
                                    }
                                >
                                    <Badge
                                        color={rankData?.color}
                                        count={rankData?.label}
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Popconfirm>
                            );
                        }

                        return (
                            <Badge
                                key={rank}
                                color={rankData?.color}
                                count={rankData?.label}
                            />
                        );
                    })}
                    {isAdmin && (
                        <Button
                            type="text"
                            style={{
                                color: colorPrimary,
                                marginLeft: 10,
                            }}
                            onClick={() => {
                                setAddRankModalVisible(member);
                            }}
                            icon={<FiPlusCircle />}
                        />
                    )}
                </>
            ),
            filters: ranks.map((rank: any) => {
                return {
                    text: rank.label,
                    value: rank._id,
                };
            }),
            onFilter: (value: any, record: any) => {
                return record.ranks.find((rank: any) => rank === value);
            },
        },
        {
            title: 'Services',
            dataIndex: 'services',
            key: 'services',
            render: (userServices: string[], member: dispatch) => (
                <>
                    {userServices.map((service: string) => {
                        const serviceData = services.find(
                            (b: any) => b._id === service,
                        );

                        if (isAdmin) {
                            return (
                                <Popconfirm
                                    key={service}
                                    title={`Supprimer ${serviceData?.label} ?`}
                                    onConfirm={() =>
                                        handleRemoveService(member, service)
                                    }
                                >
                                    <Badge
                                        color={serviceData?.color}
                                        count={serviceData?.label}
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Popconfirm>
                            );
                        }

                        return (
                            <Badge
                                key={service}
                                color={serviceData?.color}
                                count={serviceData?.label}
                            />
                        );
                    })}
                    {isAdmin && (
                        <Button
                            type="text"
                            style={{
                                color: colorPrimary,
                                marginLeft: 10,
                            }}
                            onClick={() => {
                                setAddServiceModalVisible(member);
                            }}
                            icon={<FiPlusCircle />}
                        />
                    )}
                </>
            ),
            filters: services.map((service: any) => {
                return {
                    text: service.label,
                    value: service._id,
                };
            }),
            onFilter: (value: any, record: any) => {
                return record.services.find((b: any) => b === value);
            },
        },
        {
            title: 'Numéro de téléphone',
            dataIndex: 'phone',
            key: 'phone',
        },
        ...(isAdmin
            ? [
                  {
                      title: 'Compte bancaire',
                      dataIndex: 'bank',
                      key: 'bank',
                  },
              ]
            : []),
        {
            title: 'Badges',
            dataIndex: 'badges',
            key: 'badges',
            render: (userBadges: string[], member: dispatch) => (
                <>
                    {userBadges.map((badge: string) => {
                        const badgeData = badges.find(
                            (b: any) => b._id === badge,
                        );

                        if (isAdmin) {
                            return (
                                <Popconfirm
                                    key={badge}
                                    title={`Supprimer le badge ?`}
                                    onConfirm={() => {
                                        handleRemoveBadge(member, badge);
                                    }}
                                >
                                    <Badge
                                        style={{
                                            marginLeft: 10,
                                            cursor: 'pointer',
                                        }}
                                        color={badgeData?.color}
                                        count={badgeData?.label}
                                    />
                                </Popconfirm>
                            );
                        }

                        return (
                            <Badge
                                style={{marginLeft: 10}}
                                key={badge}
                                color={badgeData?.color}
                                count={badgeData?.label}
                            />
                        );
                    })}
                    {isAdmin && (
                        <Button
                            type="text"
                            style={{
                                color: colorPrimary,
                                marginLeft: 10,
                            }}
                            onClick={() => {
                                setAddBadgeModalVisible(member);
                            }}
                            icon={<FiPlusCircle />}
                        />
                    )}
                </>
            ),
            filters: badges.map((badge: any) => {
                return {
                    text: badge.label,
                    value: badge._id,
                };
            }),
            onFilter: (value: any, record: any) => {
                return record.badges.find((b: any) => b === value);
            },
        },
        // Actions
    ];

    return (
        <>
            <AddBadgeModal
                visible={!!addBadgeModalVisible}
                onClose={() => {
                    setAddBadgeModalVisible(null);
                }}
                memberData={addBadgeModalVisible}
            />
            <AddRankModal
                visible={!!addRankModalVisible}
                onClose={() => {
                    setAddRankModalVisible(null);
                }}
                memberData={addRankModalVisible}
            />
            <AddServiceModal
                visible={!!addServiceModalVisible}
                onClose={() => {
                    setAddServiceModalVisible(null);
                }}
                memberData={addServiceModalVisible}
            />
            <Table rowKey="id" columns={columns} dataSource={members} />
        </>
    );
};

export default DispatchTable;
