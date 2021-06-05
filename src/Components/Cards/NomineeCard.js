import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom'
import Modal1 from '../Modal/Modal'
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons'
import ModalVideo from 'react-modal-video'
import { Modal, Button } from 'antd';

import ReactPlayer from "react-player";


const NomineeCard = ({ p }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOpen, setOpen] = useState(false);
  const [ytlink, setYtlink] = useState(null)

  const vote = () => {
    setIsModalVisible(true)
  }

  useEffect(()=>{
    if(!ytlink && isOpen){
      setOpen(false);
    }
  },[ytlink])

  console.log(p, "ppp")
  return (
    <>
      <Modal1 isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <Modal style={{ height: '100%' }} width="100%" height="100%" footer={null} visible={isOpen} onCancel={() => {setYtlink(null);}}>
        <ReactPlayer
          playing={isOpen}
          width="100%"
          url={`https://www.youtube.com/watch?v=${ytlink}`}
        />
      </Modal>
      <div className='nominee-card'>
        <div
          className='img'
          style={{
            clipPath: 'circle(50% at 50% 50%)',
            height: '200px',
            width: '200px',
            backgroundImage: `url(${p.image})`,
            cursor:'pointer'
          }}
          onClick={() => { setOpen(true); setYtlink(p.ytlink) }}
        ></div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '1rem' }}>{p.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem', alignItems: 'center' }}>{<PlayCircleOutlined onClick={() => { setOpen(true); setYtlink(p.ytlink) }} />}{<Button style={{ cursor: 'pointer', backgroundColor: 'rgb(172, 7, 75)', color: 'white' }} onClick={vote}>Vote Now</Button>} {<a style={{ fontSize: '1.5rem' ,color:'black' }} target='_blank' rel={'external'} href={p.weblink}><ArrowRightOutlined /></a>}</div>
      </div>
    </>
  );
};

export default NomineeCard;
