import React from 'react';
import {Button, Card, Form, Input, Modal} from 'antd';
import {socket} from '../../../socket';
import RanksTable from '../tables/RanksTable';

interface RanksModalProps {
    onClose: () => void;
    visible: boolean;
}

const RanksModal: React.FC<RanksModalProps> = ({onClose, visible}) => {
    const handleCreateRank = (data: {label: string; color: string}) => {
        socket.emit('createRank', {
            label: data.label,
            color: data.color,
        });
    };

    return (
        <Modal
            open={visible}
            footer={null}
            onCancel={onClose}
            title="Gestion des grades"
            width={800}
        >
            <RanksTable />

            <Card title="Ajouter un grade">
                <Form
                    name="createRank"
                    onFinish={handleCreateRank}
                    layout="vertical"
                >
                    <Form.Item>
                        <Form.Item
                            name="label"
                            label="Nom"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer un nom de grade',
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

export default RanksModal;
