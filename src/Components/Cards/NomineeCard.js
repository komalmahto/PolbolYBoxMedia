import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Modal from '../Modal/Modal'
import {ArrowRightOutlined ,PlayCircleOutlined}from '@ant-design/icons'

const NomineeCard = ({ p }) => {
   const [isModalVisible,setIsModalVisible]=useState(false)
   const vote=()=>{
     setIsModalVisible(true)
   }
  console.log(p,"ppp")
  return (
    <>
    <Modal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
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
      <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'1rem',alignItems:'center'}}>{<span style={{fontSize:'2rem'}}><PlayCircleOutlined /></span>}{<span style={{cursor:'pointer'}} onClick={vote}>Vote Now</span>} {<Link style={{fontSize:'2rem'}} target={'_blank'} to={p.weblink}><ArrowRightOutlined /></Link>}</div>
    </div>
    </>
  );
};

export default NomineeCard;
