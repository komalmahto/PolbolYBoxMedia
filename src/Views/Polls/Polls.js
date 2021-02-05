import React, { useState, useEffect } from 'react';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import { cats } from '../../Components/icons/Icons';
import { Tabs } from 'antd';
import axios from '../../axios';
import moment from 'moment';
import PollCard from '../../Components/Polls/PollCard';
import { icons } from '../../Components/icons/Icons';
import {connect} from 'react-redux';

const Polls = ({english:{english}}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [pollsBasedOnCategory, setPollsBasedOnCategory] = useState({});

  const { TabPane } = Tabs;
  useEffect(() => {
    fetchPollsSelected();
  }, [english]);

  useEffect(() => {
    fetchPollsSelected();
  }, [selectedTags]);

  const fetchPollsSelected = async (page) => {
    const queryParam = selectedTags.join(',');
    try {
      const response = await axios.get(`/common/polls?hindi=${!english}`, {
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
          <span>{useData.length + ' ' + type + ' ' + type2}</span>
        </div>
        <div className='pollCont'>
          {useData &&
            useData.map(
              (p) =>
                p.hidden === false && (
                  <PollCard english={english} icons={icons} type2={type2} p={p} type={type}/>
                )
            )}
        </div>
      </>
    );
  };
  return (
    <div className='poll-box'>
      <div>
        <h1>Polls</h1>
        <div>
          <CategoryBar
            onChange={onChange}
            checkChecked={checkChecked}
            cats={cats}
          />
          <Tabs onChange={callback} type='card'>
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
  english:state.english
});

export default connect(mapStateToProps)(Polls);