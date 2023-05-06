import React from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {socket} from '../../../socket';
import {useAppSelector} from '../../../redux/hooks';

interface AddBadgeModalProps {
    visible: boolean;
    onClose: () => void;
    memberData: any;
}

const AddBadgeModal: React.FC<AddBadgeModalProps> = ({
    visible,
    onClose,
    memberData,
}) => {
    const {badges} = useAppSelector((state) => state.dispatch);

    const handleAddBadge = (data: {badge: string}) => {
        socket.emit('updateOtherUser', {
            id: memberData.id,
            newData: {
                badges: [...memberData.badges, data.badge],
            },
        });

        onClose();
    };

    return (
        <Modal
            title="Ajouter un badge"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form name="addBadge" layout="vertical" onFinish={handleAddBadge}>
                <Form.Item
                    label="badge"
                    name="badge"
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez sélectionner un badge',
                        },
                    ]}
                >
                    <Select showSearch placeholder="Sélectionner un badge">
                        {badges.map((badge: any) => (
                            <Select.Option value={badge._id} key={badge._id}>
                                {badge.label}
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

export default AddBadgeModal;
