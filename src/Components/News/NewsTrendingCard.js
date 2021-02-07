import React from 'react'
import {RightOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const NewsTrendingCard = ({k,setIt}) => {
  return (
    <div onClick={()=>setIt &&setIt(k)} className='trending-news-single'>
    <div className='image-cont'>
      <img src={k.news.images[0]} alt='' />
    </div>
    <div className='trending-desc'>
      <div className='trending-desc-1'>
        <span>{k.title}</span>
        <p style={{fontSize:'1.2rem'}}>{k.description.substr(0,40)+'...'}</p>
      </div>
      <div className='trending-desc-2'>
        <span style={{cursor:'pointer'}}><RightOutlined /></span>
      </div>
    </div>
  </div>
  )
}

export default NewsTrendingCard
