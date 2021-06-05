import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from '../../axios';
import NomineeCard from '../../Components/Cards/NomineeCard';
import JuryCard from '../../Components/Cards/JuryCard';
import AwardResult from '../../Components/Result/AwardResult';
import moment from 'moment';
import Modal from '../../Components/Modal/Modal'
import { Link } from 'react-router-dom'

const Award = ({ match }) => {
  const { TabPane } = Tabs;

  const [subCat, setSubCat] = useState([]);
  const [comm, setComm] = useState([]);
  const [sh, setSh] = useState(false)
  const [showInfo, setShowInfo] = useState([]);
  useEffect(() => {
    fetchAward();
    fetchComments();
    fetchShowInfo();
    window.scrollTo(0, 0);
  }, []);

  const fetchAward = async () => {
    await axios
      .get(`award/awardList?categoryId=${match.params.catId}`)
      .then((res) => {
        console.log(res.data);
        setSubCat(res.data.payload);
      });
  };

  const fetchShow = async () => {
    await axios
      .get(`award/awardList?categoryId=${match.params.catId}`)
      .then((res) => {
        console.log(res.data);
        setSubCat(res.data.payload);
      });
  };

  const fetchComments = async () => {
    await axios
      .get(`award/audienceComments?id=${match.params.awardId}`)
      .then((res) => {
        console.log(res, 'COMMENTS');
        setComm(res.data.payload);
      }).catch(err => {
        console.log(err, 'Error in award');
      });
  };

  function callback(key) {
    console.log(key);
  }
  const award = () => {
    const arr = subCat.filter((c) => {
      return c._id === match.params.awardId;
    });
    return arr;
  };
  console.log(award(), 'aww');

  const fetchShowInfo = async () => {
    await axios
      .get(`/award/fetchAwardsAndCategories`)
      .then((res) => {
        console.log('fetchShowInfo Called');
        setShowInfo(res.data.payload);
      });
  };

  const show = () => {
    const arr = showInfo.filter((c) => {
      return c._id === match.params.showId && c.isAward === true;
    });
    return arr;
  }

  console.log(show()[0], 'show info');

  const getExpiryString1 = (expiryTime) => {
    const lifeEndTime = moment(expiryTime);
    const now = moment();
    let duration = moment.duration(lifeEndTime.diff(now));
    console.log(duration, 'duration');
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
    return minDiff < 0 ? true : false;
  };

  return (
    <div className='box'>
      <Link to={`/categories/subcat/${match.params.showId}/${match.params.catId}`}><span style={{fontSize:'1.7rem'}}><i class="fas fa-arrow-left"></i> &nbsp; Back</span></Link>

      <Modal isModalVisible={sh} setIsModalVisible={setSh} />
      <h2 style={{ margin: '2rem 0' }}>
        {award() && award().length > 0 && award()[0].heading}
      </h2>
      <Tabs onChange={callback} type='card'>
        <TabPane tab='Nominees' key='1'>
          <div className='nom-div' style={{ padding: '5rem 10rem' }}>
            {award() &&
              award().length > 0 &&
              award()[0].nominations.map((p) => <NomineeCard p={p} />)}
          </div>
        </TabPane>
        <TabPane tab='Jury' key='2'>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
              justifyItems: 'center',
              gridGap: '1.5rem',
            }}
          >
            {show() && show().length > 0 ? getExpiryString1(show()[0].lifeSpan) ? award() &&
              award().length > 0 &&
              award()[0].jurys.map((p) => <JuryCard p={p} />) : <div>Jury Comments will be disclosed on {moment(show()[0].lifeSpan).format('MMMM Do YYYY')}.</div> : null}
          </div>
        </TabPane>

        {award() &&
          award().length > 0 && (
            <TabPane tab='Results' key='3'>
              {show() && show().length > 0 ? getExpiryString1(show()[0].lifeSpan) ?
                <AwardResult
                  id={award() && award().length > 0 && award()[0]._id}
                /> : <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
                  justifyItems: 'center',
                  gridGap: '1.5rem',
                }} >Results will be declared on {moment(show()[0].lifeSpan).format('MMMM Do YYYY')}.</div> : null}
            </TabPane>
          )}

        <TabPane tab='Comments' key='4'>
          {comm.length > 0 &&
            comm.map((m) => (
              <div className="comm-cont">
                <div>
                  <img style={{ width: '50px' }} src={m.user.avatar} alt='' />
                </div>
                <div>
                  <p>
                    <span style={{ fontWeight: 'bolder' }}> @{m.user.userName} </span> Voted{' '}
                    <span style={{ textTransform: 'capitalize', color: 'grey' }}>
                      <i>{m.award.nominations.name}</i>
                    </span>
                  </p>
                  <p className="comment-1" style={{ color: 'black' }}>{m.comment}</p>
                </div>
              </div>

            ))}
          <div onClick={() => setSh(true)} className='comment'>
            <p style={{ color: 'grey' }}>Add comments.....</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Award;
