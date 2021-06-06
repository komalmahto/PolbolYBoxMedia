import React,{useEffect,useState} from 'react'
import NewsTrendingCard from '../../Components/News/NewsTrendingCard'
import { fetchNews } from '../../Actions/NewsAction';
import { connect } from 'react-redux';
import axios from '../../axios'
import ReactPlayer from 'react-player'
import { Switch } from 'antd';



const Livetv = ({english: { english },fetchNews,news:{news},history}) => {
  const [channels,setChannels]=useState([])
  const [englishLan,setEnglishLan]=useState(true)
  const [trending,setTrending]=useState([])

  const [play,setPlay]=useState(englishLan? {
    "language": "english",
    "priority": 90,
    "hidden": false,
    "_id": "5eaf0fe46936d7087a582a23",
    "name": "India Today",
    "link": "https://indiatodaylive.akamaized.net/hls/live/2014320/indiatoday/indiatodaylive/playlist.m3u8",
    "image": "https://polbol-media.s3.ap-south-1.amazonaws.com/newsIcon/india_today.jpg",
    "createdAt": "2020-05-03T18:39:32.117Z",
    "updatedAt": "2020-05-03T18:39:32.117Z",
    "__v": 0
}: {
  "language": "hindi",
  "priority": 60,
  "hidden": false,
  "_id": "5eaf0fe46936d7087a582a13",
  "name": "AajTak",
  "link": "https://feeds.intoday.in/aajtak/api/master.m3u8",
  "image": "https://polbol-media.s3.ap-south-1.amazonaws.com/newsIcon/aajtak.png",
  "createdAt": "2020-05-03T18:39:32.116Z",
  "updatedAt": "2020-05-03T18:39:32.116Z",
  "__v": 0
})
  useEffect(() =>{
    fetchNews();
    fetchChannels();
    getTrending();
  },[english])
  const getTrending=async()=>{
    await axios.get(`notification/latest?language=${english?'english':'hindi'}`).then((res)=>{
      console.log(res.data.payload,"trend")
     setTrending(res.data.payload.payload)
    })
  }

  useEffect(()=>{
    if(englishLan){
      setPlay({
        "language": "english",
        "priority": 90,
        "hidden": false,
        "_id": "5eaf0fe46936d7087a582a23",
        "name": "India Today",
        "link": "https://indiatodaylive.akamaized.net/hls/live/2014320/indiatoday/indiatodaylive/playlist.m3u8",
        "image": "https://polbol-media.s3.ap-south-1.amazonaws.com/newsIcon/india_today.jpg",
        "createdAt": "2020-05-03T18:39:32.117Z",
        "updatedAt": "2020-05-03T18:39:32.117Z",
        "__v": 0
    })
    }
    else{
      setPlay({
        "language": "hindi",
        "priority": 60,
        "hidden": false,
        "_id": "5eaf0fe46936d7087a582a13",
        "name": "AajTak",
        "link": "https://feeds.intoday.in/aajtak/api/master.m3u8",
        "image": "https://polbol-media.s3.ap-south-1.amazonaws.com/newsIcon/aajtak.png",
        "createdAt": "2020-05-03T18:39:32.116Z",
        "updatedAt": "2020-05-03T18:39:32.116Z",
        "__v": 0
      })
    }

  },[englishLan])
const fetchChannels=async()=>{
  await axios.get("channels")
  .then((res)=>{
    console.log(res.data.payload)
setChannels(res.data.payload)  })
.catch((err)=>{
  console.log(err);
})


}

const playTv=(c)=>{
console.log(c);
setPlay(c)
}
function onChange(checked) {
  console.log(`switch to ${checked}`);
  setEnglishLan(checked)
}
const checkPlaying=(id)=>{
  console.log(play._id,id)
if(play._id === id){
  return {
    height:'6rem',
    width:'6rem',
    borderRadius:'50%',
    marginRight:'15px',
    marginBottom:'1.5rem',
    border:"4px solid red",
    padding:"0.5rem",
    cursor:'pointer',
    boxShadow: '5px 10px 18px #888888'

  

  }
}
else {
  return {
    height:'6rem',
    width:'6rem',
    borderRadius:'50%',
    marginRight:'15px',
    marginBottom:'1.5rem',
    cursor:'pointer',
    boxShadow: '5px 10px 18px #888888'

  }
}
}


  return (
    <div className="news">
    <div className='news-head'>
{ /*   <h1>Live Tv</h1>
*/}  </div>
  <section  className='news-section1'>
    <div className="left">
    <div style={{marginBottom:'2rem'}}>
    {channels.filter((h)=>{return h.hidden===false}).filter((p)=>{return englishLan?p.language==='english':p.language==="hindi" }).map((c)=>(
      <img style={checkPlaying(c._id)} onClick={()=>playTv(c)}  src={c.image} alt=""/>
    ))}
    
    </div>
    <div>
    {Object.keys(play).length>0 && <ReactPlayer  playing={true} width="100%" controls={true} url={play.link} />
  }
  <div style={{display:"flex",justifyContent:"space-between",padding:'1rem'}}><span style={{fontWeight:"bold"}}>{Object.keys(play).length>0 && play.name}</span><span><span>Hindi</span><Switch style={{margin:'0 1rem'}} defaultChecked onChange={onChange} /><span>English</span></span></div>
    </div>
   
    </div>
    <div className='spotlight'>
      <div className='spotlight-head'>
        <span>{english ? 'Trending News' : 'ट्रेंडिंग समाचार' }</span>
        <span style={{color:'#56a7ff'}}>View all</span>
      </div>
      <div className='trending-news'>
        {trending&&
          trending.length>0&&
          trending
            .map((k) => 
            <div onClick={() => history.push(`/news/${k.targetId}`)}>
            <NewsTrendingCard k={k} />
            </div>
            )}
      </div>
    </div>
  </section>

    </div>
  )
}

const mapStateToProps = (state) => ({
  news: state.news,
  english:state.english
});

export default connect(mapStateToProps, {
  fetchNews,
})(Livetv);