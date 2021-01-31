import React, { useState, useEffect } from 'react';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import { cats } from '../../Components/icons/Icons';
import { Tabs } from 'antd';
import axios from '../../axios';
import moment from 'moment';
import PollCard from '../../Components/Polls/PollCard';
import { icons } from '../../Components/icons/Icons';
import { fetchAwards } from '../../Actions/AwardsAction';
import { connect } from 'react-redux';

const Awards = ({fetchAwards,awards:{awards}}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [pollsBasedOnCategory, setPollsBasedOnCategory] = useState({});

  const { TabPane } = Tabs;
  useEffect(() => {
    fetchPollsSelected();
    fetchAwards();
  }, []);

  useEffect(() => {
    fetchPollsSelected();
  }, [selectedTags]);

  const fetchPollsSelected = async (page) => {
    const queryParam = selectedTags.join(',');
    try {
      const response = await axios.get('/common/polls', {
        params: {
          page,
          categories: selectedTags.length > 0 ? queryParam : undefined,
        },
      });
      const responseJSON = response.data;
      setPollsBasedOnCategory(responseJSON);

      console.log(responseJSON, 'selected news');
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

  const PollView = (data, type, type2) => {
    let useData;
    if(type2==='awards'){
      if (type === 'active') {
        if(selectedTags.length>0){
          useData =
          data &&data.length>0 &&
          data.filter((l)=>{return selectedTags.includes(l.type[0])}).filter((p) => {
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
        if(selectedTags.length>0){
          useData =
          data &&data.length>0 &&
          data.filter((l)=>{return selectedTags.includes(l.type[0])}).filter((p) => {
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
      <>
        <div style={{ margin: '1.5rem 0' }}>
          {useData && <span>{useData.length + ' ' + type + ' ' + type2}</span>}
        </div>
        <div className='pollCont'>
          {useData &&
            useData.map(
              (p) =>
                p.hidden === false && (
                  <PollCard icons={icons} type2={type2} p={p} />
                )
            )}
        </div>
      </>
    );
  };
  return (
    <div className='poll-box'>
      <div>
        <h1>Awards</h1>
        <div>
          <CategoryBar
            onChange={onChange}
            checkChecked={checkChecked}
            cats={cats}
          />
          <Tabs onChange={callback} type='card'>
            <TabPane tab='Active' key='1'>
              {PollView(awards, 'active', 'awards')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {PollView(awards, 'expired', 'awards')}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  polls: state.polls,
  awards:state.awards
});

export default connect(mapStateToProps, {
  fetchAwards
})(Awards);