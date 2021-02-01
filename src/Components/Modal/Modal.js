import React, { useState } from 'react';
import { Modal, Button } from 'antd';
const Modal1 = ({ isModalVisible, setIsModalVisible }) => {
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
    
    </Modal>
  );
};

export default Modal1;
