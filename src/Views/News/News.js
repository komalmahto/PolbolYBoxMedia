import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../Actions/NewsAction';
import NewsTrendingCard from '../../Components/News/NewsTrendingCard';
import NewsCard from '../../Components/News/NewsCard';
import {cats} from '../../Components/icons/Icons'
import {Checkbox} from 'antd'
import axios from '../../axios';
import CategoryBar from '../../Components/CategoryBar/CategoryBar'

const News = ({ fetchNews, news: { news } }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newsBasedOnCategory, setNewsBasedOnCategory] = useState({});
  let p1=news && news.payload.length>0 && news.payload[0]
  const [data,setData]=useState(p1)
console.log(p1);
  useEffect(() => {
    fetchNews();
    fetchNewsSelected();
    p1=news && news.payload.length>0 && news.payload[0]
    setData(p1)
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
  const setIt=(p)=>{
    console.log(p)

    setData(p)
    window.scrollTo(0, 0)

  }
  return (
    <div className='news'>
      <div className='news-head'>
        <h1>News</h1>
      </div>
      <section className='news-section1'>
        <div className="left">
        <div className="left-head"><p>{data &&data.headline}</p><span>{data && data.categories[0]}</span></div>
        <div className="left-body">
        <div className="image">
        <img src={data && data.images[0]} alt=""/>
        </div>
        <div className="description">
        <p>{data && data.description}</p>
        <div className="download">
        <p>To enjoy the full experience of PolBol,download the PolBol App</p>
        <span>Download PolBol App</span>
        </div>
        </div>
        </div>
        </div>
        <div className='spotlight'>
          <div className='spotlight-head'>
            <span>Spotlight</span>
            <span>View all</span>
          </div>
          <div className='trending-news'>
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

      <section className="news-section2">
     <CategoryBar onChange={onChange} cats={cats} checkChecked={checkChecked}/>
    <div className="news-container">
    {Object.keys(newsBasedOnCategory).length > 0 &&
      newsBasedOnCategory.payload.data.length > 0 &&
      newsBasedOnCategory.payload.data.map((p) => <NewsCard data={data} setIt={setIt} p={p} />)}
    </div>

      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, {
  fetchNews,
})(News);
