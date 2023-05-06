import React from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {socket} from '../../../socket';
import {useAppSelector} from '../../../redux/hooks';

interface AddRankModalProps {
    visible: boolean;
    onClose: () => void;
    memberData: any;
}

const AddRankModal: React.FC<AddRankModalProps> = ({
    visible,
    onClose,
    memberData,
}) => {
    const {ranks} = useAppSelector((state) => state.dispatch);

    const handleAddRank = (data: {rank: string}) => {
        socket.emit('updateOtherUser', {
            id: memberData.id,
            newData: {
                ranks: [...memberData.ranks, data.rank],
            },
        });

        onClose();
    };

    return (
        <Modal
            title="Ajouter un grade"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form name="addRank" layout="vertical" onFinish={handleAddRank}>
                <Form.Item
                    label="grade"
                    name="rank"
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez sélectionner un grade',
                        },
                    ]}
                >
                    <Select showSearch placeholder="Sélectionner un grade">
                        {ranks.map((rank: any) => (
                            <Select.Option value={rank._id} key={rank._id}>
                                {rank.label}
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

export default AddRankModal;
