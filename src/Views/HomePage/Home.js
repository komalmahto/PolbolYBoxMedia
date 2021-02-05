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

const Home = ({ fetchNews, news: { news } }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newsBasedOnCategory, setNewsBasedOnCategory] = useState({});

  useEffect(() => {
    fetchNews();
    fetchNewsSelected();
  }, []);

  useEffect(() => {
    fetchNewsSelected();
  }, [selectedTags]);

  const fetchNewsSelected = async (page) => {
    const queryParam = selectedTags.join(',');
    try {
      const response = await axios.get('/common/news', {
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='box'>
      <section className='section-news'>
        <div className='section-news-left'>
          <div className='section-news-left--head'>
            <span className="news-head">News</span>
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
                <label style={checkChecked(p)}>
                  {p}
                  <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
                </label>
              ))}
            </Checkbox.Group>
          </div>
          <div
            style={{ overflowX: 'scroll' }}
            className='card-container'
            responsive={responsive}
          >
            {Object.keys(newsBasedOnCategory).length > 0 &&
              newsBasedOnCategory.payload.data.length > 0 &&
              newsBasedOnCategory.payload.data.map((p) => <NewsCard p={p} />)}
          </div>
        </div>
        <div className='section-news-right'>
          <div className='trending-head'>
            <span>Trending</span>
            <Link className="viewAll" to="/news">View all</Link>
          </div>
          <div className='trending-news' style={{overflowY:'scroll'}}>
            {news &&
              news.payload.length > 0 &&
              news.payload
                .filter((f) => {
                  return f.trending === true;
                })
                .map((k) => <NewsTrendingCard k={k} />)}
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
});

export default connect(mapStateToProps, {
  fetchNews,
})(Home);
