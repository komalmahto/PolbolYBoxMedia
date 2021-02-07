import React, { useState } from 'react';
import Graph from '../Result/Graph';
import { PieChartOutlined, ArrowRightOutlined,LikeOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
  const showModal = (id) => {
    setIsModalVisible(true);
    setId(id);
  };
  const setIt = (p) => {
    setType3(true);
    setType3Data(p);
  };

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
      <Graph
        key={p._id}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={id}
      />
      <Link
      to={awardPath()}
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
          <span><LikeOutlined /> {p.likesCount}</span>
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
          {type2==='polls'&&(            <Link style={{textAlign:'right'}} onClick={()=>english?window.open(`${p.url}`):window.open(`${p.url_hindi}`)}>Read more</Link>
            )}
        </div>
      </Link>
    </>
  );
};

export default PollCard;
