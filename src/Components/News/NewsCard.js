import React from 'react'
import {RightOutlined} from '@ant-design/icons'
import {icons} from '../icons/Icons'


const NewsCard = ({p,setIt,data}) => {

  const setBord=()=>{
    if(data){
    if(p._id === data._id){
      return {border:'2px solid #a62844'}
    }
  }
  }
  return <div style={setBord()}  className='card'>
                  <div
                    className='card-img'
                    style={{ backgroundImage: `url(${p.images[0]})` }}
                  ></div>
                  
                  <div className='news-headlines'>
                    <span><img style={{height:'25px',width:'25px',marginRight:'1rem'}} src={icons[p.categories[0]]}/>{p.categories[0]} News</span>
                    <p>{p.short_headline}</p>
                  </div>
                  <div className="description">
                  <p>{p.description.substr(0,80)+'...'}.</p>
                  </div>
                  <div className='published'>
                    <img
                      src={p.user.avatar}
                      style={{ width: '25px', height: '25px' }}
                      alt=''
                    />
                    <div className='user'>
                      <span>
                        {p.user.firstName} {p.user.lastName}
                      </span>
                
                    </div>
                  </div>
                  <div className='read-more'>
                    <span style={{cursor:'pointer'}} onClick={()=>setIt(p)}>
                      Read more <RightOutlined />
                    </span>
                  </div>
                </div>
  
}

export default NewsCard
