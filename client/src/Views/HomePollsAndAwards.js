import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { Checkbox, Row, Col } from 'antd';
import { fetchPolls } from '../Actions/PollsAction';
import { connect } from 'react-redux';
import moment from 'moment';
import {icons,cats} from '../Components/icons/Icons'

const { TabPane } = Tabs;

const HomePollsAndAwards = ({ fetchPolls, polls: { polls } }) => {
  const [selectedTagsPolls, setSelectedTagsPolls] = useState([]);
 
  useEffect(() => {
    fetchPolls();
  }, []);
  function callback(key) {
    console.log(key);
  }
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    setSelectedTagsPolls(checkedValues);
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
  const grid = (data, type) => {
    console.log(data, 'data');
    let useData;
    if (type === 'active') {
      useData =
        data &&
        data.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      console.log(useData);
    } else if (type === 'expired') {
      useData =
        data &&
        data.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) < 0;
        });
      console.log(useData);
    }

    return (
      <div className='grid-46'>
        <div style={{ backgroundColor: '#ffff' }}>
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
        <div style={{overflowY:'scroll'}}>
          <div className="top">
            <span>
              {useData && useData.length}{' '}
              {type === 'active' ? 'active' : 'expired'} polls
            </span>
            <span>View all</span>
          </div>
          <div className="grid-2" >
            {useData &&
              useData.map((p) => (

              p.hidden===false&&  <div className="long-card">
                <div className='long-card-img' style={{backgroundImage:`url(${p.image})`}}></div>
                <div className='long-card-desc'>
                <div style={{display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                <span className="heading"><img style={{height:'25px',width:'25px',marginRight:'1rem'}} src={icons[p.categories[0]]}/>Poll on {p.categories[0]}</span>
                <p>{p.question}</p>
              
                </div>
                <span className="give-rating">Give Rating</span>
                </div>
                 
                </div>
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
              {grid(polls, 'active','polls')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {grid(polls, 'expired','polls')}
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab='Awards' key='2'>
          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='Active' key='1'>
              {grid()}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {grid()}
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  polls: state.polls,
});

export default connect(mapStateToProps, {
  fetchPolls,
})(HomePollsAndAwards);
