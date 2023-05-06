import React from 'react';
import {Button, Card, Form, Input, Modal} from 'antd';
import {socket} from '../../../socket';
import ServicesTable from '../tables/ServicesTable';

interface ServicesModalProps {
    onClose: () => void;
    visible: boolean;
}

const ServicesModal: React.FC<ServicesModalProps> = ({onClose, visible}) => {
    const handleCreateService = (data: {label: string; color: string}) => {
        socket.emit('createService', {
            label: data.label,
            color: data.color,
        });
    };

    return (
        <Modal
            open={visible}
            footer={null}
            onCancel={onClose}
            title="Gestion des services"
            width={800}
        >
            <ServicesTable />

            <Card title="Ajouter un service">
                <Form
                    name="createService"
                    onFinish={handleCreateService}
                    layout="vertical"
                >
                    <Form.Item>
                        <Form.Item
                            name="label"
                            label="Nom"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Veuillez entrer un nom de service',
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

export default ServicesModal;
