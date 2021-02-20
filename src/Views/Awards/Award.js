import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from '../../axios';
import NomineeCard from '../../Components/Cards/NomineeCard';
import JuryCard from '../../Components/Cards/JuryCard';
import AwardResult from '../../Components/Result/AwardResult';
import moment from 'moment';
import Modal from '../../Components/Modal/Modal'

const Award = ({ match }) => {
  const { TabPane } = Tabs;

  const [subCat, setSubCat] = useState([]);
  const [comm, setComm] = useState([]);
  const [sh,setSh]=useState(false)
  useEffect(() => {
    fetchAward();
    fetchComments();
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

  const fetchComments = async () => {
    await axios
      .get(`award/audienceComments?id=${match.params.awardId}`)
      .then((res) => {
        console.log(res, 'COMMENTS');
        setComm(res.data.payload);
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
    <Modal isModalVisible={sh} setIsModalVisible={setSh}/>
      <h2 style={{ margin: '2rem 0' }}>
        {award() && award().length > 0 && award()[0].heading}
      </h2>
      <Tabs onChange={callback} type='card'>
        <TabPane tab='Nominees' key='1'>
          <div className='nom-div' style={{padding:'5rem 10rem'}}>
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
            {award() &&
              award().length > 0 &&
              award()[0].jurys.map((p) => <JuryCard p={p} />)}
          </div>
        </TabPane>

        {award() &&
          award().length > 0 &&
          getExpiryString1(award()[0].lifeSpan) && (
            <TabPane tab='Results' key='3'>
              <AwardResult
                id={award() && award().length > 0 && award()[0]._id}
              />
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
                  @{m.user.userName} Voted{' '}
                  <span style={{ textTransform: 'capitalize' }}>
                    {m.award.nominations.name}
                  </span>
                </p>
                <p className="comment-1">{m.comment}</p>
                </div>
              </div>
              
            ))}
            <div onClick={()=>setSh(true)} className='comment'>
            <p style={{color:'grey'}}>Add comments.....</p>
              </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Award;
