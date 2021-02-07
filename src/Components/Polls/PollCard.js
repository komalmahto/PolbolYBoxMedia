import React, { useState } from 'react';
import Graph from '../Result/Graph';
import Bar from '../Result/Bar'
import { PieChartOutlined, ArrowRightOutlined,LikeOutlined ,HeartOutlined,CommentOutlined,ShareAltOutlined } from '@ant-design/icons';
import { Link,useHistory } from 'react-router-dom';
import axios from '../../axios'
import { Modal, Button } from 'antd';
import moment from 'moment'
import Stars from 'react-stars-display'
import StarRatings from 'react-star-ratings';


const PollCard = ({
  type2,
  p,
  icons,
  getExpiryString1,
  type,
  setType3,
  setType3Data,
  english
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState('');
  const history=useHistory()
  const [isCommentModal,setIsCommentModal]=useState(false);
  const showModal = (id) => {
    setIsModalVisible(true);
    setId(id);
  };
  const setIt = (p) => {
    setType3(true);
    setType3Data(p);
  };
  const [comments,setComments]=useState([])


  const handleOk = () => {
    setIsCommentModal(false);
  };

  const handleCancel = () => {
    setIsCommentModal(false);
  };
  const getComments=(id)=>{
    console.log(id)
    
axios.get(`/common/polls/comments?poll=${id}`)
.then(res=>{
  console.log(res.data.payload.data)
  setComments(res.data.payload.data)
  setIsCommentModal(true)
})
  }

  const awardPath=()=>{
    if(type2 === 'awards' && p.hasCategories){
      return`/award/categories/${p._id}`
    }
    if(type2 === 'awards' && !p.hasCategories && !p.isSubcategory){
return `/award/subcat/${p._id}`
    }
    // if(type2 === 'awards' && p.isSubcategory ){
    //   return ``
    // }

  }
  return (
    <>
    {/*  <Graph
        key={p._id}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={id}
    />*/}
    <Bar key={p._id} id={id} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    <Modal title="Comments" visible={isCommentModal} onOk={handleOk} onCancel={handleCancel}>
    {
      comments && comments.length >0&&comments.map((c)=>(
       <div className="comment">
       <img style={{width:'30px'}} src={c.user.avatar} alt=""/>
       <div className="det">
       <span>@{c.user.userName}{" "}Voted{" "}{typeof(c.answer)==='number'?<StarRatings
       rating={c.answer}
       starRatedColor="brown"
       numberOfStars={c.answer}
       starDimension="15px"
        starSpacing="5px"
       name='rating'
     />:`${c.answer}`} </span>
       <p>{c.comment}</p>
       <p className="bot">{c.likesCount>0&&<span>{c.likesCount} {c.likesCount===1?'like':'likes'}</span>}{ " "} <span>{moment(c.createdAt).fromNow()}</span></p>
       </div>
       </div>
      ))
    }
  </Modal>
      <div
      // to={awardPath()}
      onClick={()=>type2==='awards'&& history.push(awardPath())}
        className={
          type2 === 'polls'
            ? 'long-card long-card-hor'
            : 'long-card long-card-ver'
        }
      >
      <div className="lef"> <span className='heading'>
      {type2 === 'polls' && (
        <img
          style={{ height: '25px', width: '25px', marginRight: '1rem' }}
          src={
            type2 === 'polls'
              ? icons[p.categories[0]]
              : icons[p.type[0]]
          }
        />
      )}
      {type2 === 'polls'
        ? `Poll on ${p.categories[0]}`
        : `${getExpiryString1 && getExpiryString1(p.lifeSpan)}`}
    </span>
        {english&&<div
          className='long-card-img'
          style={{
            backgroundImage: `url(${
              type2 === 'polls' ? p.image : p.icon ? p.icon : p.image
            })`,
          }}
        ></div>}
        {!english&&<div
          className='long-card-img'
          style={{
            backgroundImage: `url(${
              type2 === 'polls' ? p.image_hindi : p.icon_hindi ? p.icon_hindi : p.image
            })`,
          }}
        ></div>}
        </div>
        <div className='long-card-desc'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
           
            {type2 === 'awards' && p.hasCategories && (
              <Link
                style={{ textAlign: 'center' }}
                to={`/award/categories/${p._id}`}
              >
                <ArrowRightOutlined />
              </Link>
            )}
            {type2 === 'awards' && !p.hasCategories && !p.isSubcategory && (
              <Link
                style={{ textAlign: 'center' }}
                to={`/award/subcat/${p._id}`}
              >
                <ArrowRightOutlined />
              </Link>
            )}
            {type2 === 'awards' && p.isSubcategory && (
              <span  style={{ textAlign: 'center' }}>
                <ArrowRightOutlined />
              </span>
            )}
            <p>{english?p.question:p.question_hindi}</p>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          {type2 === 'polls' && (
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'0.5rem'}}>
          <span></span>
            </div>
          )}
          {type2 === 'polls' && type && type === 'expired' && (
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => showModal(p._id)}
            >
            {english?'Result':'परिणाम'}{' '}
              <PieChartOutlined />
            </span>
          )}
          </div>
          <div className="read-more-poll">

          {type2==='polls'&&<div className="ico">
      <span className="i"><span style={{marginRight:'0.3rem'}}><HeartOutlined /></span>{p.likesCount}</span>
      <span style={{ cursor: 'pointer' }} className="i" onClick={()=>getComments(p._id)}><span style={{marginRight:'0.3rem'}}><CommentOutlined /></span>{p.commentCount}</span>
      <span className="i"><span><ShareAltOutlined /></span></span>
      </div>}
          {type2==='polls'&&(            <Link style={{textAlign:'right'}} onClick={()=>english?window.open(`${p.url}`):window.open(`${p.url_hindi}`)}>Read more</Link>
            )}
            </div>
        </div>
      </div>
    </>
  );
};

export default PollCard;
