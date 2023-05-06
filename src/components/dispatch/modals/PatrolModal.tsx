import React from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {socket} from '../../../socket';
import {useAppSelector} from '../../../redux/hooks';

interface PatrolModalProps {
    onClose: () => void;
    visible: boolean;
}

const PatrolModal: React.FC<PatrolModalProps> = ({onClose, visible}) => {
    const {badges, members} = useAppSelector((state) => state.dispatch);

    const handleStartPatrol = (data: {mates: string[]; patrol: string}) => {
        socket.emit('startPatrol', {
            mates: data.mates,
            patrol: data.patrol,
        });
        onClose();
    };

    const membersWithoutPatrol = members.filter(
        (member: any) => member.badges.length === 0,
    );

    return (
        <Modal
            open={visible}
            footer={null}
            onCancel={onClose}
            title="Démarrage d'une patrouille"
        >
            <Form
                name="startPatrol"
                onFinish={handleStartPatrol}
                layout="vertical"
            >
                <Form.Item>
                    <Form.Item
                        name="patrol"
                        label="Patrouille"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez sélectionner une patrouille',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option?.label
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            placeholder="Sélectionner une patrouille"
                            options={badges.map((badge: any) => ({
                                value: badge._id,
                                label: badge.label,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item name="mates" label="Coéquipier(s)">
                        <Select
                            showSearch
                            allowClear
                            filterOption={(input, option) =>
                                option?.label
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            mode="multiple"
                            placeholder="Sélectionner un ou plusieurs coéquipiers"
                            options={membersWithoutPatrol.map(
                                (member: any) => ({
                                    value: member.id,
                                    label: member.username,
                                }),
                            )}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Commencer la patrouille
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PatrolModal;
