import React from 'react'
import {RightOutlined} from '@ant-design/icons'

const NewsTrendingCard = ({k}) => {
  return (
    <div className='trending-news-single'>
    <div className='image-cont'>
      <img src={k.images[0]} alt='' />
    </div>
    <div className='trending-desc'>
      <div className='trending-desc-1'>
        <span>{k.short_headline}</span>
        <p style={{fontSize:'1.2rem'}}>{k.description.substr(0,40)+'...'}</p>
      </div>
      <div className='trending-desc-2'>
        <RightOutlined />
      </div>
    </div>
  </div>
  )
}

export default NewsTrendingCard
