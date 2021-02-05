import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { Checkbox, Row, Col } from 'antd';
import { fetchPolls } from '../../Actions/PollsAction';
import { fetchAwards } from '../../Actions/AwardsAction';
import { connect } from 'react-redux';
import moment from 'moment';
import {icons,cats} from '../../Components/icons/Icons'
import PollCard from '../../Components/Polls/PollCard'
import axios from '../../axios'
import {useHistory} from 'react-router-dom'

const { TabPane } = Tabs;

const HomePollsAndAwards = ({ fetchPolls,fetchAwards, polls: { polls },awards:{awards} }) => {
  const [selectedTagsPolls, setSelectedTagsPolls] = useState([]);
  const [selectedTagsAwards,setSelectedTagsAwards]=useState([])
  const [pollsBasedOnCategory,setPollsBasedOnCategory]=useState({})
  const [expiredAwards,setExpiredAwards]=useState({})
const history=useHistory();
  const types=[
    "Bollywood",
    "Sports",
    "Politics"
  ]
 
  useEffect(() => {
    fetchPolls();
    fetchAwards();
    fetchPollsSelected();
    fetchExpiredAwards();
  }, []);
useEffect(()=>{
  fetchPollsSelected();

},[selectedTagsPolls])

const fetchExpiredAwards = async (page) => {
  try {
    const response = await axios.get('/award/fetchAwardsAndCategories?mode=expired');
    const responseJSON = response.data;
    setExpiredAwards(responseJSON);
    console.log(responseJSON, 'expired awards');
  } catch (err) {
    console.log(err);
  }
};

  const fetchPollsSelected = async (page) => {
    const queryParam = selectedTagsPolls.join(',');
    try {
        const response = await axios.get('/common/polls', {
            params: {
                page,
                categories: selectedTagsPolls.length > 0 ? queryParam : undefined
            }
        });
        const responseJSON = response.data;
        setPollsBasedOnCategory(responseJSON)

        console.log(responseJSON,"selected news");
   
    } catch (err) {
        console.log(err);
    }
};
  function callback(key) {
    console.log(key);
  }
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    setSelectedTagsPolls(checkedValues);
  }

  function onChangeSel(checkedValues){
    console.log('checked = ', checkedValues);
    setSelectedTagsAwards(checkedValues);
  }
  const checkChecked = (item) => {
    console.log(selectedTagsPolls);
    const bool = selectedTagsPolls.indexOf(item);
    console.log(bool);
    if (bool !== -1) {
      return {
        backgroundColor: '#a62844',
        color: 'white',
      };
    }
  };
  const checkChecked1 = (item) => {
    console.log(selectedTagsAwards);
    const bool = selectedTagsAwards.indexOf(item);
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

  const getExpiryString1 = (expiryTime) => {
    const lifeEndTime = moment(expiryTime);
    const now = moment();
    let duration = moment.duration(lifeEndTime.diff(now));
    console.log(duration,"duration")
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
    return minDiff<0?'show has expired':`${duration._data.hours} hours ${duration._data.minutes} minutes left!!`;
  };
  const grid = (data, type,type2) => {
    console.log(data, 'data');
    let useData;
if(type2==='polls'){
    if (type === 'active') {
      useData =
        Object.keys(data).length>0 &&
        data.payload.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      console.log(useData);
    } else if (type === 'expired') {
      useData =
        Object.keys(data).length>0 &&
        data.payload.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) < 0;
        });
      console.log(useData);
    }
  }
  if(type2==='awards'){
    if (type === 'active') {
      if(selectedTagsAwards.length>0){
        useData =
        data &&data.length>0 &&
        data.filter((l)=>{return selectedTagsAwards.includes(l.type[0])}).filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      }
      else{
      useData =
        data &&data.length>0 &&
        data.filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      console.log(useData);
      }
    } else if (type === 'expired') {
      if(selectedTagsAwards.length>0){
        useData =
        data &&data.length>0 &&
        data.filter((l)=>{return selectedTagsAwards.includes(l.type[0])}).filter((p) => {
          return getExpiryString(p.lifeSpan) < 0;
        });
      }
      else{
      useData =
        data &&data.length>0 &&
        data.filter((p) => {
          return getExpiryString(p.lifeSpan) < 0;
        });
      console.log(useData);
      }
    }
  }

    return (
      <div className='grid-46'>
        <div style={{ backgroundColor: '#ffff' }}>
          {type2==='polls'&&<Checkbox.Group
            className='tags'
            style={{ width: '100%' }}
            onChange={onChange}
          >
          {type2==='polls'&&cats.map((p)=>(
            <label style={checkChecked(p)}>
              {p}
              <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
            </label>
          ))}
          </Checkbox.Group>}
          {type2==='awards'&&<Checkbox.Group
          className='tags'
          style={{ width: '100%' }}
          onChange={onChangeSel}
        >
        {type2==='awards'&&cats.map((p)=>(
          <label style={checkChecked1(p)}>
            {p}
            <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
          </label>
        ))}
        </Checkbox.Group>}





        </div>
        <div style={{overflowY:'scroll'}}>
          <div className="top">
            <span>
              {useData && useData.length}{' '}
              {data && data.length===0&& "0"}{" "}
              {type === 'active' ? 'active' : 'expired'} {type2==='polls'?'polls':'Awards'}
            </span>
            <span onClick={()=>{type2==='polls'?history.push('/polls'):history.push("/awards")}}  className="viewAll">View all</span>
          </div>
          <div className="grid-2" >
            {useData &&
              useData.map((p) => (

              p.hidden===false&&  <PollCard type={type} icons={icons} type2={type2} p={p} getExpiryString1={getExpiryString1}/>
              ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='card-container'>
      <Tabs type='card'>
        <TabPane tab='Polls' key='1'>
          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='Active' key='1'>
              {grid(pollsBasedOnCategory, 'active','polls')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {grid(pollsBasedOnCategory, 'expired','polls')}
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab='Awards' key='2'>
          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='Active' key='1'>
              {grid(awards,'active','awards')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {grid(expiredAwards.payload,'expired','awards')}
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  polls: state.polls,
  awards:state.awards
});

export default connect(mapStateToProps, {
  fetchPolls,fetchAwards
})(HomePollsAndAwards);
