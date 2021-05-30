import React, { useState, useEffect } from 'react';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import { cats,catspa } from '../../Components/icons/Icons';
import { Tabs } from 'antd';
import axios from '../../axios';
import moment from 'moment';
import PollCard from '../../Components/Polls/PollCard';
import { icons } from '../../Components/icons/Icons';
import {connect} from 'react-redux';


const Polls = ({english:{english},auth:{token}}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [pollsBasedOnCategory, setPollsBasedOnCategory] = useState({});
  const [page,setPage]=useState(1)
  const [vote,setVote]=useState(false)


  const { TabPane } = Tabs;
  useEffect(() => {
    fetchPollsSelected();
  }, [english,token,vote]);

  useEffect(() => {
    fetchPollsSelected();
  }, [selectedTags]);

  const fetchPollsSelected = async (page) => {
    const queryParam = selectedTags.join(',');
    try {
      if(token){
      const response = await axios.get(`/polls?hindi=${!english}&mode=active`,{
        headers: {
            Authorization: {
              toString() {
                return `Bearer `+JSON.parse(token);
              }
            }
        },
        params: {
          page,
          categories: selectedTags.length > 0 ? queryParam : undefined,
        },
      });
      const response1 = await axios.get(`/polls?hindi=${!english}&mode=expired`,{
        headers: {
            Authorization: {
              toString() {
                return `Bearer `+JSON.parse(token);
              }
            }
        },
        params: {
          page,
          categories: selectedTags.length > 0 ? queryParam : undefined,
        },
      });
      console.log(response1)
      console.log(response.data.payload.payload.concat(response1.data.payload.payload))
      const final=response.data.payload.payload.concat(response1.data.payload.payload)
      console.log(final)
      response.data.payload.payload=final
      const responseJSON = response.data;
      setPollsBasedOnCategory(responseJSON);

      console.log(responseJSON, 'selected news');
    }
    else{
      const response = await axios.get(`/common/polls?hindi=${!english}`,{
        params: {
          page,
          categories: selectedTags.length > 0 ? queryParam : undefined,
        },
      });
      const responseJSON = response.data;
      setPollsBasedOnCategory(responseJSON);

      console.log(responseJSON, 'selected news');
    }
    
    } catch (err) {
      console.log(err);
    }
  };

  function callback(key) {
    console.log(key);
  }
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

  const getExpiryString = (expiryTime) => {
    const lifeEndTime = moment(expiryTime);
    const now = moment();
    let duration = moment.duration(lifeEndTime.diff(now));
    let difference = Math.floor(duration.asDays());
    let minDiff = Math.floor(duration.asMinutes());
    console.log(minDiff, 'diff');

    let unit = 'days';
    if (difference < 1) {
      difference = Math.floor(duration.asHours());
      unit = 'hours';
    }
    if (difference < 1) {
      difference = Math.floor(duration.asMinutes());
      unit = 'minutes';
    }
    return minDiff;
  };

  const checkLength=(data,type)=>{

    let useData=[]
    if(type==='polls'){
    useData =
    Object.keys(data).length>0 &&
    data.payload.payload.filter((p) => {
      return getExpiryString(p.lifeSpan) > 0;
    });
  console.log(useData);
  return useData.length;
  }

  }

  const PollView = (data, type, type2) => {
    let useData;
    if (type === 'active') {
      useData =
        Object.keys(data).length > 0 &&
        data.payload.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      console.log(useData);
    } else if (type === 'expired') {
      useData =
        Object.keys(data).length > 0 &&
        data.payload.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) < 0;
        });
      console.log(useData);
    }

    return (
      <>
        <div style={{ margin: '1.5rem 0' }}>
{  /*        <span>{useData.length + ' ' + type + ' ' + type2}</span>
    */}        </div>
        <div className='pollCont'>
          {!token&&useData &&
            useData.slice(0,10*page).map(
              (p) =>
                p.hidden === false  && (
                  <PollCard setVote={setVote} vote={vote} english={english} icons={icons} type2={type2} p={p} type={type}/>
                )
            )}
             {token&&useData &&
            useData.slice(0,10*page).map(
              (p) =>
                (
                  <PollCard setVote={setVote} vote={vote} english={english} icons={icons} type2={type2} p={p} type={type}/>
                )
            )}
        </div>
        
        {useData && useData.length>page*10&&<center><button className="loadmore" onClick={changePage}>Load more</button></center>}
      </>
    );
  };
  const changePage=()=>{
    setPage(page+1)
  }
  return (
    <div className='poll-box'>
      <div>
        {/*<h1>Polls</h1>*/}
        <div>
          <CategoryBar
            onChange={onChange}
            checkChecked={checkChecked}
            cats={catspa}
          />
          <Tabs size={'large'} defaultActiveKey={checkLength(pollsBasedOnCategory,'polls')===0?'1':'2'} onChange={callback} type='card'>
            <TabPane tab='Active' key='1'>
              {PollView(pollsBasedOnCategory, 'active', 'polls')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {PollView(pollsBasedOnCategory, 'expired', 'polls')}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  english:state.english,
  auth:state.auth
});

export default connect(mapStateToProps)(Polls);