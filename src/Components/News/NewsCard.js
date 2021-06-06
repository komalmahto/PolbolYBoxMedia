import React, { useEffect } from 'react';
import {
  RightOutlined,
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { icons , hindiTranslate } from '../icons/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const convertToHindi = (string)=>{
  let p = string.charAt(0).toLowerCase() + string.slice(1);
  let ans=  p.split(' ').join('');
  return ans;
}

const NewsCard = ({ auth: { token, user },english:{english}, p, setIt, data }) => {
  const setBord = () => {
    if (data) {
      if (p._id === data._id) {
        return { border: '2px solid #a62844' };
      }
    }
  };


  return (
    <Link
      to={`/news/${p._id}`}
      onClick={() => setIt && setIt(p)}
      style={{ cursor: 'pointer' }}
      className='card'
    >
      <div
        className='card-img'
        style={{ backgroundImage: `url(${p.images[0]})` }}
      ></div>

      <div className='news-headlines'>
        <span>
          <img
            style={{ height: '25px', width: '25px', marginRight: '1rem' }}
            src={icons[p.categories[0]]}
          />
          {english ? p.categories[0] : hindiTranslate[convertToHindi(p.categories[0])]} {english ? 'News' : 'समाचार'}
        </span>
        {/*       <p>{p.short_headline}</p>
         */}{' '}
      </div>
      <div style={{ fontWeight: 'bold' }} className='description'>
        <p>{p.headline}</p>
      </div>
      <div className='description'>
        <p>{p.description.substr(0, 80) + '...'}.</p>
      </div>
      {/*<div className='published'>
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
  </div>*/}

      <div className='read-more'>
        {/*<div className="ico">
      <span className="i"><span style={{marginRight:'0.3rem'}}><HeartOutlined /></span>{p.likesCount}</span>
      <span className="i"><span style={{marginRight:'0.3rem'}}><CommentOutlined /></span>{p.commentCount}</span>
      <span className="i"><span><ShareAltOutlined /></span></span>
</div>*/}
        {setIt ? (
          <span
            className='read'
            style={{ cursor: 'pointer' }}
            onClick={() => setIt && setIt(p)}
          >
           {english ? 'Read more':'अधिक पढ़ें'} <RightOutlined />
          </span>
        ) : (
          <Link
            className='read'
            to={`/news/${p._id}`}
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => setIt && setIt(p)}
          >
            {english ? 'Read more':'अधिक पढ़ें'} <RightOutlined />
          </Link>
        )}
        {/* <span className='i'>
          <span style={{ marginRight: '0.3rem' }}>
            {token ? p.likedByMe ? <i style={{ color: 'red' }} className="fas fa-heart"></i> : <i class="far fa-heart" ></i> : <i class="far fa-heart" ></i>}
            {p.likesCount}
          </span>
          <span style={{ marginRight: '0.3rem' }}>
            <CommentOutlined />
          </span>
          {p.commentCount}
        </span> */}
      </div>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  english:state.english
});

export default connect(mapStateToProps)(NewsCard);


