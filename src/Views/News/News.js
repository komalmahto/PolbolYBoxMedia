import React, { useEffect, useState,useRef } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../Actions/NewsAction';
import NewsTrendingCard from '../../Components/News/NewsTrendingCard';
import NewsCard from '../../Components/News/NewsCard';
import { cats } from '../../Components/icons/Icons';
import { Checkbox } from 'antd';
import axios from '../../axios';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import { icons } from '../../Components/icons/Icons';
import {Link} from 'react-router-dom'
import Modal from '../../Components/Modal/Modal'
import {HeartOutlined,CommentOutlined,ShareAltOutlined,ArrowRightOutlined,CopyOutlined,RightOutlined} from '@ant-design/icons'

const News = ({ fetchNews, news: { news },english:{english}, match, history }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newsBasedOnCategory, setNewsBasedOnCategory] = useState({});
  const [data, setData] = useState({});
  const textAreaRef = useRef(null);
  const [copy,setCopy]=useState("")
  const [copySuccess, setCopySuccess] = useState('');
  const [trending,setTrending]=useState([])
  const [isModalVisible,setIsModalVisible]=useState(false)

useEffect(() => {
  window.scrollTo(0,0)
}, [])
  useEffect(() => {
    console.log(match);
    const ne=history.location.pathname.split('/')[2]
    console.log(ne)
    if(news && news.payload.length > 0 )
    {
      const lol = news.payload.filter((f) => {
        return f._id === history.location.pathname.split('/')[2];
      });
      console.log(news.payload)
      console.log(lol)
      setData(lol[0]);
    }
    if (news && news.payload.length > 0 && !ne) {
      const lol = news.payload.filter((f) => {
        return f.trending === true;
      });
      setData(lol[0]);
    }
  }, [news,history.location.pathname]);
  console.log(history.location.pathname.split('/')[2], 'his');
  useEffect(() => {
    fetchNews(english);
    fetchNewsSelected(1);
    getTrending()
   
  }, [english]);


  const getTrending=async()=>{
    await axios.get(`notification/latest?language=${english?'english':'hindi'}`).then((res)=>{
      console.log(res.data.payload,"trend")
     setTrending(res.data.payload.payload)
    })
  }

  useEffect(() => {
    fetchNewsSelected(1);
  }, [selectedTags,english]);

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
      if(responseJSON.payload.data===null){
      setNewsBasedOnCategory([]);
      }
      else{
        setNewsBasedOnCategory(responseJSON);
      }

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
  const setIt = (p) => {
    console.log(p);

    setData(p);
    setCopy("")
    setCopySuccess("")
    window.scrollTo(0, 0);
  };
  const copyToClip=(id)=>{
    console.log(id)
    axios.get(`news/shortUrl/${id}`)
    .then((res) =>{
     setCopy(res.data.payload)
    } )

  }


  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');

  };
  const setMod=()=>{
    setIsModalVisible(true)
  }
  return (
    <div className='news'>
    <Modal   isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}/>
      <div className='news-head'>
        <h1>{english?'NEWS':'समाचार'}</h1>
      </div>
      <CategoryBar
        onChange={onChange}
        cats={cats}
        checkChecked={checkChecked}
      />

      <section className='news-section1'>
        {data && Object.keys(data).length > 0 && (
          <div className='left'>
            <div className='grid-222'>
              <img
                style={{ height: '40px', width: '40px', marginRight: '1rem' }}
                src={
                  data &&
                  data.categories&&
                  data.categories.length > 0 ?
                  icons[data.categories[0]]:icons[data.icon]
                }
              />

              <div>
                <span>
                  News on{' '}
                  {data &&data.categories&& data.categories.length > 0 && data.categories[0]}
                  {data && data.icon}
                </span>
                {data.user &&<p>
                  By {data.user&&data.user.firstName&&data.user.firstName} {data.user&&data.user.lastName&&data.user.lastName}
                </p>}
              </div>
            </div>
            <div className='left-body'>
              <div className='image'>
                <img src={data && data.images&& data.images[0]?data.images[0]:data.news.images[0]} alt='' />
              </div>
              <div className='description'>
                <div className='left-head'>
                  <p>{data && data.headline?data.headline:data.title}</p>
                </div>

                <p>{data && data.description}</p>
                {/*<div className="download">
        <p>To enjoy the full experience of PolBol,download the PolBol App</p>
        <span>Download PolBol App</span>
  </div>*/}
              </div>
            </div>
            <div className="news-bot">
            <div className="ico">
            <span ><HeartOutlined />{data.likesCount}</span>
            <span><CommentOutlined onClick={setMod}/>{data.commentCount}</span>
            <span style={{cursor:'pointer'}} onClick={()=>copyToClip(data && data.targetId?data.targetId:data._id)}><ShareAltOutlined /></span>
            </div>
           
            <div className="read">
            <Link onClick={()=>window.open(`${data.source}`)} target="_blank" className="readmore">Read more <span><RightOutlined /></span></Link>
            </div>

            </div>
            <div className="copy">
            {copy&&<form>
            <input type="text"
              ref={textAreaRef}
              value={copy}
            />
            <span onClick={copyToClipboard}>{copySuccess?copySuccess:<CopyOutlined />}</span>            
          </form>}
          </div>

          </div>
        )}
        <div className='spotlight'>
          <div className='spotlight-head'>
            <span>Trending</span>
            {/* <span>View all</span>*/}
          </div>
          <div className='trending-news'>
            {trending &&
              trending.length >0&&
              trending
                .map((k) => 
                
                <NewsTrendingCard k={k} setIt={setIt}/>
             
                )}
          </div>
        </div>
      </section>

      <section className='news-section2'>
        <div className='news-container'>
          {Object.keys(newsBasedOnCategory).length > 0 &&
            newsBasedOnCategory.payload.data.length > 0 &&
            newsBasedOnCategory.payload.data[0]!==null&&
            newsBasedOnCategory.payload.data.map((p) => (
    
              <NewsCard data={data} setIt={setIt} p={p} />
            
      
            ))}
           
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
  english: state.english
});

export default connect(mapStateToProps, {
  fetchNews,
})(News);



// news &&
//               news.payload.length > 0 &&
//               news.payload
//                 .filter((f) => {
//                   return f.trending === true;
//                 })