import React from 'react';
import {Button, Card, Form, Input, Modal} from 'antd';
import BadgesTable from '../tables/BadgesTable';
import {socket} from '../../../socket';

interface BadgesModalProps {
    onClose: () => void;
    visible: boolean;
}

const BadgesModal: React.FC<BadgesModalProps> = ({onClose, visible}) => {
    const handleCreateBadge = (data: {badge: string; color: string}) => {
        socket.emit('createBadge', {
            label: data.badge,
            color: data.color,
        });
    };

    return (
        <Modal
            open={visible}
            footer={null}
            onCancel={onClose}
            title="Gestion des badges"
            width={800}
        >
            <BadgesTable />

            <Card title="Ajouter un badge">
                <Form
                    name="createBadge"
                    onFinish={handleCreateBadge}
                    layout="vertical"
                >
                    <Form.Item>
                        <Form.Item
                            name="badge"
                            label="Nom"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer un nom de badge',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="color"
                            label="Couleur"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer une couleur',
                                },
                            ]}
                        >
                            <Input type="color" />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Ajouter
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    );
};

export default BadgesModal;
