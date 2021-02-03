import React,{useState} from 'react';
import Graph from '../Result/Graph'
import {PieChartOutlined,ArrowRightOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const PollCard = ({type2,p,icons,getExpiryString1,type,setType3,setType3Data}) => {
  const [isModalVisible,setIsModalVisible]=useState(false)
  const [id,setId]=useState("")
  const showModal=(id)=>{
setIsModalVisible(true)
setId(id)
  }
  const setIt=(p)=>{
    setType3(true)
    setType3Data(p)

  }
  return (
    <>
    
    <Graph key={p._id} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} id={id}/>
    <div
      className={
        type2 === 'polls'
          ? 'long-card long-card-hor'
          : 'long-card long-card-ver'
      }
    >
      <div
        className='long-card-img'
        style={{
          backgroundImage: `url(${type2 === 'polls' ? p.image : p.icon?p.icon:p.image})`,
        }}
      ></div>
      <div className='long-card-desc'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span className='heading'>
            {type2 === 'polls' && (
              <img
                style={{ height: '25px', width: '25px', marginRight: '1rem' }}
                src={
                  type2 === 'polls' ? icons[p.categories[0]] : icons[p.type[0]]
                }
              />
            )}
            {type2 === 'polls'
              ? `Poll on ${p.categories[0]}`
              : `${getExpiryString1 && getExpiryString1(p.lifeSpan)}`}
            
          </span>
          {type2==="awards"&& p.hasCategories&& <Link style={{textAlign:'center'}}  to={`/award/categories/${p._id}`}><ArrowRightOutlined /></Link>}
          {type2==="awards"&& !p.hasCategories && !p.isSubcategory&& <Link style={{textAlign:'center'}}  to={`/award/subcat/${p._id}`}><ArrowRightOutlined /></Link>}
          {type2==="awards"&&  p.isSubcategory&& <span   style={{textAlign:'center'}}  ><ArrowRightOutlined /></span>}
          <p>{p.question}</p>
        </div>
        {type2 === 'polls' && <span className='give-rating'>Give Rating</span>}
        {type2==='polls' && type && type==='expired'&& <span style={{cursor:'pointer'}} onClick={()=>showModal(p._id)}>Result <PieChartOutlined /></span>}
      </div>
    </div>
    </>
  );
};

export default PollCard;
