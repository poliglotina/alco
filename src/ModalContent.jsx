import React from 'react';
import { Modal, Input, Form, Rate } from 'antd';

const CardModal = ({ item, handleSave, handleClose }) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    handleSave(form.getFieldsValue());
  };
  return (
    <Modal
      title={item.name}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={true}
      onOk={handleOk}
      onCancel={handleClose}
      okText={'Сохранить'}
    >
      <div className='card-modal-container'>
        <Form
          name='card-form'
          initialValues={item}
          autoComplete='off'
          form={form}
        >
          <Form.Item
            name='rate'
            layout='vertical'
            style={{ textAlign: 'center' }}
          >
            <Rate style={{ fontSize: 40, width: '100%' }} count={10} />
          </Form.Item>
          <Form.Item name='comment' layout='vertical'>
            <Input.TextArea
              placeholder='Ну что, сивуха или годнота?)'
              rows={5}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CardModal;
