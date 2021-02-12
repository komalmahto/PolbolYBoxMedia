import React, { useState, useEffect } from 'react';
import { RightOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import HomePollsAndAwards from './HomePollsAndAwards';
import HomeSection3 from './HomeSection3';
import { Card} from 'antd';
import {cats} from '../../Components/icons/Icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Checkbox} from 'antd';
import axios from '../../axios';
import { fetchNews } from '../../Actions/NewsAction';
import NewsCard from '../../Components/News/NewsCard';
import NewsTrendingCard from '../../Components/News/NewsTrendingCard';
import {Link} from 'react-router-dom'

const Home = ({ fetchNews, news: { news },english:{english},history}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newsBasedOnCategory, setNewsBasedOnCategory] = useState({});
  const [trending,setTrending]=useState([])

  useEffect(() => {
    fetchNews(english);
    fetchNewsSelected();
    getTrending()
  }, [english]);

  useEffect(() => {
    fetchNewsSelected();
  }, [selectedTags]);

  const fetchNewsSelected = async (page) => {
    const queryParam = selectedTags.join(',');
    try {
      const response = await axios.get(`/common/news?hindi=${!english}`, {
        params: {
          page,
          categories: selectedTags.length > 0 ? queryParam : undefined,
        },
      });
      const responseJSON = response.data;
      setNewsBasedOnCategory(responseJSON);
      console.log(responseJSON, 'selected news');
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
  const getTrending=async()=>{
    await axios.get(`notification/latest?language=${english?'english':'hindi'}`).then((res)=>{
      console.log(res.data.payload,"trend")
     setTrending(res.data.payload.payload)
    })
  }

  const CustomButtonGroupAsArrows = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group"> 
        <button className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} >previous</button>
        <button onClick={() => next()} >next</button>
      </div>
    );
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1100 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1100, min: 670 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 670, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='box'>
      <section className='section-news'>
        <div className='section-news-left'>
          <div className='section-news-left--head'>
            <span className="news-head">{english?'NEWS':'समाचार'}</span>
            <Link className="viewAll"  to="/news">
              View all
              <span></span>
            </Link>
          </div>
          <div className='section-news-left--tags'>
            <Checkbox.Group
              className='tags'
              style={{ width: '100%' }}
              onChange={onChange}
            >
              {cats.map((p) => (
                <label className="cur" style={checkChecked(p)}>
                  {p}
                  <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
                </label>
              ))}
            </Checkbox.Group>
          </div>
          <Carousel
          sliderClass="class-slide"
          itemClass="class-slide"
          customButtonGroup={<CustomButtonGroupAsArrows />}
          renderButtonGroupOutside={true}
            style={{ overflowX: 'scroll',display:'flex',justifyContent:'space-evenly' }}
            className='card-container'
            responsive={responsive}
          >
            {Object.keys(newsBasedOnCategory).length > 0 &&
              newsBasedOnCategory.payload.data.length > 0 &&
              newsBasedOnCategory.payload.data.map((p) => <NewsCard p={p} />)}
          </Carousel>
        </div>
        <div className='section-news-right'>
          <div className='trending-head'>
            <span>Trending News</span>
            <Link className="viewAll" to="/news">View all</Link>
          </div>
          <div className='trending-news' style={{overflowY:'scroll'}}>
            {
              trending
              .filter((p)=>{
if(selectedTags.length >0){
                return selectedTags.includes(p.icon)
}
else return p
              })
                .map((k) => 
                <div onClick={() => history.push(`/news/${k.targetId}`)}>
                <NewsTrendingCard   k={k} />
                </div>
                )}
          </div>
        </div>
      </section>
      <section className='home-section-2' style={{ marginTop: '2rem' }}>
        <HomePollsAndAwards />
      </section>
      <section className='home-section-3'>
        <HomeSection3 />
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  news: state.news,
  english:state.english
});

export default connect(mapStateToProps, {
  fetchNews,
})(Home);
