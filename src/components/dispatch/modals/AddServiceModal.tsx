import React from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {socket} from '../../../socket';
import {useAppSelector} from '../../../redux/hooks';

interface AddServiceModalProps {
    visible: boolean;
    onClose: () => void;
    memberData: any;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
    visible,
    onClose,
    memberData,
}) => {
    const {services} = useAppSelector((state) => state.dispatch);

    const handleAddService = (data: {service: string}) => {
        socket.emit('updateOtherUser', {
            id: memberData.id,
            newData: {
                services: [...memberData.services, data.service],
            },
        });

        onClose();
    };

    return (
        <Modal
            title="Ajouter un service"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                name="addService"
                layout="vertical"
                onFinish={handleAddService}
            >
                <Form.Item
                    label="Service"
                    name="service"
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez sélectionner un service',
                        },
                    ]}
                >
                    <Select showSearch placeholder="Sélectionner un service">
                        {services.map((service: any) => (
                            <Select.Option
                                value={service._id}
                                key={service._id}
                            >
                                {service.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Ajouter
                </Button>
            </Form>
        </Modal>
    );
};

export default AddServiceModal;
