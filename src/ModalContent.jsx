import React, { useState, useRef } from 'react';
import { Modal, Input, Form, Rate, Image, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CardModal = ({ item, handleSave, handleClose }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const handleOk = () => {
    handleSave({ ...form.getFieldsValue(), file });
  };

  const fileInputRef = useRef();

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
            <Rate style={{ width: '100%' }} count={10} className='modal-rate' />
          </Form.Item>
          <Form.Item name='comment' layout='vertical'>
            <Input.TextArea
              placeholder='Ну что, сивуха или годнота?)'
              rows={5}
            />
          </Form.Item>
        </Form>

        <label>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileInputRef}
          />
          {!item.photo_url && (
            <Button
              icon={<UploadOutlined />}
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              Выбрать фото
            </Button>
          )}
          {file?.name || ''}
        </label>
        {item.photo_url && (
          <div style={{ textAlign: 'center' }}>
            <Image width={200} src={item.photo_url} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CardModal;
