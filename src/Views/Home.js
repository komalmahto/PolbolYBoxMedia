import React, { useState, useEffect } from 'react';
import branding from '../assets/GIF-2021-01-24-17-20-09.gif';
import { RightOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import HomePollsAndAwards from './HomePollsAndAwards'
import HomeSection3 from './HomeSection3'
import { Card, Avatar } from 'antd';
import {icons,cats} from '../Components/icons/Icons'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Checkbox, Row, Col } from 'antd';
import axios from '../axios';
import { fetchNews } from '../Actions/NewsAction';
const { Meta } = Card;

const Home = ({ fetchNews, news: { news } }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newsBasedOnCategory,setNewsBasedOnCategory]=useState({});
  let newsData=news && news

  useEffect(() => {
    fetchNews();
    fetchNewsSelected();

  }, []);

  useEffect(() =>{
    fetchNewsSelected();

  },[selectedTags])

  const fetchNewsSelected = async (page) => {
    const queryParam = selectedTags.join(',');
    try {
        const response = await axios.get('/common/news', {
            params: {
                page,
                categories: selectedTags.length > 0 ? queryParam : undefined
            }
        });
        const responseJSON = response.data;
        setNewsBasedOnCategory(responseJSON)
        newsData=response.JSON

        console.log(responseJSON,"selected news");
   
    } catch (err) {
        console.log(err);
    }
};
  console.log(news);
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    setSelectedTags(checkedValues);
  }
  const checkChecked = (item) => {
    console.log(selectedTags);
    const bool = selectedTags.indexOf(item);
    console.log(bool);
    if (bool !== -1) {
      return {
        backgroundColor: '#a62844',
        color: 'white',
      };
    }
  };
  
  return (
    <div className='box'>
      <section className='section-news'>
        <div className='section-news-left'>
          <div className='section-news-left--head'>
            <span>News</span>
            <span>
              View all
              <RightOutlined />
            </span>
          </div>
          <div className='section-news-left--tags'>
            <Checkbox.Group
              className='tags'
              style={{ width: '100%' }}
              onChange={onChange}
            >
            {cats.map((p)=>(
              <label style={checkChecked(p)}>
                {p}
                <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
              </label>
            ))}
            
            </Checkbox.Group>
          </div>

          <div style={{ overflowX: 'scroll' }} className='card-container'>
            {Object.keys(newsBasedOnCategory).length>0 &&
              newsBasedOnCategory.payload.data.length > 0 &&
              newsBasedOnCategory.payload.data.map((p) => (
                <div className='card'>
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
                    <span>
                      Read more <RightOutlined />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='section-news-right'>
          <div className='trending-head'>
            <span>Trending</span>
            <span>View all</span>
          </div>
          <div className='trending-news'>
            {news &&
              news.payload.length > 0 &&
              news.payload
                .filter((f) => {
                  return f.trending === true;
                })
                .map((k) => (
                  <div className='trending-news-single'>
                    <div className='image-cont'>
                      <img src={k.images[0]} alt='' />
                    </div>
                    <div className='trending-desc'>
                      <div className='trending-desc-1'>
                        <span>News headlines</span>
                        <p>{k.short_headline}</p>
                      </div>
                      <div className='trending-desc-2'>
                        <RightOutlined />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
      <section className="home-section-2" style={{marginTop:'2rem'}}>
      <HomePollsAndAwards/>
      </section>
      <section className="home-section-3">
     {/* <HomeSection3/>*/}
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, {
  fetchNews,
})(Home);
