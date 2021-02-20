import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Modal1 from '../Modal/Modal'
import {ArrowRightOutlined ,PlayCircleOutlined}from '@ant-design/icons'
import ModalVideo from 'react-modal-video'
import {Modal} from 'antd';


const NomineeCard = ({ p }) => {
   const [isModalVisible,setIsModalVisible]=useState(false)
   const [isOpen, setOpen] = useState(false)

   const vote=()=>{
     setIsModalVisible(true)
   }
  console.log(p,"ppp")
  return (
    <>
    <Modal1 isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
    <Modal footer={null} visible={isOpen} onCancel={()=>setOpen(false)}>
    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={p.ytlink} onClose={() => setOpen(false)} />

    </Modal>
    <div className='nominee-card'>
      <div
        className='img'
        style={{
          clipPath: 'circle(50% at 50% 50%)',
          height: '200px',
          width: '200px',
          backgroundImage: `url(${p.image})`,
        }}
      ></div>
      <div style={{textAlign:'center',fontWeight:'bold',marginTop:'1rem'}}>{p.name}</div>
      <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'1rem',alignItems:'center'}}>{<span onClick={()=> setOpen(true)} style={{fontSize:'2rem'}}><PlayCircleOutlined /></span>}{<span style={{cursor:'pointer'}} onClick={vote}>Vote Now</span>} {<Link style={{fontSize:'2rem'}} target='_blank' rel={'external'} to={p.weblink}><ArrowRightOutlined /></Link>}</div>
    </div>
    </>
  );
};

export default NomineeCard;
