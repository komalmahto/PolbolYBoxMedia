import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Apple from '../../assets/apple.svg';
import Play from '../../assets/play_store.png';
const Modal1 = ({ isModalVisible, setIsModalVisible , text}) => {
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
      footer={null}
    >
    <div className="mod">
        {text ? <p>{text}</p> : <p>Find out latest updates with people's views on different issues </p>}
    <div className="down">
    <a style={{display: "inline-block"}}
    href="https://apps.apple.com/pa/app/polbol/id1476395002?l=en">
     <img src={Apple} style={{height: "50px", width: "150px", marginRight: "20px"}}
          alt="App Store"/>
 </a>
 <a style={{display: "inline-block"}}
 href={`https://play.google.com/store/apps/details?id=com.polbol&hl=en_IN`}>
  <img src={Play} style={{height: "50px", width: "150px"}} alt="PlayStore"/>
</a>
</div>
    </div>

    
    
    </Modal>
  );
};

export default Modal1;
