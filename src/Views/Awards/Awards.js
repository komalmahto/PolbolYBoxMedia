import React, { useState, useEffect } from 'react';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import { cats,catsAward} from '../../Components/icons/Icons';
import { Tabs } from 'antd';
import axios from '../../axios';
import moment from 'moment';
import PollCard from '../../Components/Polls/PollCard';
import { icons } from '../../Components/icons/Icons';
import { fetchAwards } from '../../Actions/AwardsAction';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import NomineeCard from '../../Components/Cards/NomineeCard';
import JuryCard from '../../Components/Cards/JuryCard';
import AwardResult from '../../Components/Result/AwardResult';

const Awards = ({ fetchAwards, awards: { awards },english:{english} } ) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [expiredAwards, setExpiredAwards] = useState({});
  const [type3, setType3] = useState(false);
  const [type3Data, setType3Data] = useState({});
  const[comm,setComm]=useState([])

  const { TabPane } = Tabs;
  useEffect(() => {
    fetchExpiredAwards();
    fetchAwards();
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   fetchExpiredAwards();
  // }, [selectedTags]);

  const fetchExpiredAwards = async (page) => {
    try {
      const response = await axios.get(
        '/award/fetchAwardsAndCategories?mode=expired'
      );
      const responseJSON = response.data;
      setExpiredAwards(responseJSON);
      console.log(responseJSON, 'expired awards');
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
    return minDiff < 0
      ? 'show has expired'
      :  `Expiring on ${moment(expiryTime).format('Do MMMM, YYYY')}`;
  };
  const handleOk = () => {
    setType3(false);
  };

  const handleCancel = () => {
    setType3(false);
  };
  const setIt = (p) => {
    console.log(p);
    if (p.isSubcategory) {
      setType3(true);
      setType3Data(p);
    }
  };
  useEffect(()=>{
    fetchComments()
  },[type3Data])
  const checkLength = (data, type) => {
    let useData = [];

    if (type === 'awards') {
      if (selectedTags.length > 0) {
        useData =
          data &&
          data.length > 0 &&
          data
            .filter((l) => {
              return selectedTags.includes(l.type[0]);
            })
            .filter((p) => {
              return getExpiryString(p.lifeSpan) > 0;
            });
      }
      else {
        useData =
        data &&
        data.length > 0 &&
        data.filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      }
     
      return useData && useData.length;
    }
  };

  const fetchComments = async () => {
    await axios
      .get(`award/audienceComments?id=${type3Data && type3Data._id}`)
      .then((res) => {
        console.log(res, 'COMMENTS');
        setComm(res.data.payload);
      }).catch(err => {
        console.log(err,'error in comments')
      })
  };
  const PollView = (data, type, type2) => {
    let useData = [];
    if (type2 === 'awards') {
      if (type === 'active') {
        if (data && data.length > 0) {
          if (selectedTags.length > 0) {
            useData =
              data &&
              data.length > 0 &&
              data
                .filter((l) => {
                  return selectedTags.includes(l.type[0]);
                })
                .filter((p) => {
                  return getExpiryString(p.lifeSpan) > 0;
                });
          } else {
            useData =
              data &&
              data.length > 0 &&
              data.filter((p) => {
                return getExpiryString(p.lifeSpan) > 0;
              });
            console.log(useData, 'use');
          }
        }
      } else if (type === 'expired') {
        if (selectedTags.length > 0) {
          useData =
            data &&
            data.length > 0 &&
            data
              .filter((l) => {
                return selectedTags.includes(l.type[0]);
              })
              .filter((p) => {
                return getExpiryString(p.lifeSpan) < 0;
              });
        } else {
          useData =
            data &&
            data.length > 0 &&
            data.filter((p) => {
              return getExpiryString(p.lifeSpan) < 0;
            });
          // console.log(useData);
        }
      }
      // console.log(useData, 'usedata');
      // console.log(awards,'awwwwww');
    }

    return (
      <>
        <div style={{ margin: '1.5rem 0' }}>
          {/*useData &&<span>{useData.length + ' ' + type + ' ' + type2}</span>*/}
        </div>
        <div className='pollCont'>
          {useData &&
            useData.map(
              (p) =>
                p.hidden === false && (
                  <div onClick={() => setIt(p)}>
                    <PollCard
                      setType3Data={setType3Data}
                      type3={type3}
                      setType3={setType3}
                      icons={icons}
                      type2={type2}
                      english={english}
                      p={p}
                      getExpiryString1={getExpiryString1}
                      isAward={true}
                    />
                  </div>
                )
            )}
        </div>
      </>
    );
  };
  return (
    <div className='poll-box'>
      <Modal
        title={
          type3Data && Object.keys(type3Data).length > 0 && type3Data.heading
        }
        footer={null}  
        visible={type3}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <h3>{type3Data&& Object.keys(type3Data).length>0 && type3Data.heading}</h3>*/}
        <Tabs onChange={callback} type='card'>
          <TabPane tab='Nominees' key='1'>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
                justifyItems: 'center',
                gridGap: '1.5rem',
              }}
            >
              {type3Data &&
                Object.keys(type3Data).length > 0 &&
                type3Data.nominations.map((p) => <NomineeCard p={p} />)}
            </div>
          </TabPane>
          <TabPane tab='Jury' key='2'>
            <div
              tyle={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
                justifyItems: 'center',
                gridGap: '1.5rem',
              }}
            >
              {type3Data &&
                Object.keys(type3Data).length > 0 &&
                type3Data.jurys.map((p) => <JuryCard p={p} />)}
            </div>
          </TabPane>

          <TabPane tab='Results' key='3'>
            <AwardResult
              id={
                type3Data && Object.keys(type3Data).length > 0 && type3Data._id
              }
            />
          </TabPane>
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
        </TabPane>
        </Tabs>
      </Modal>
      <div>
        {/*<h1>Awards</h1>*/}
        <div>
          <CategoryBar
            onChange={onChange}
            checkChecked={checkChecked}
            cats={catsAward}
          />
          <Tabs
          size={'large'}
            defaultActiveKey={checkLength(awards, 'awards') === 0 ? '2' : '1'}
            onChange={callback}
            type='card'
          >
            <TabPane tab={ awards ? `Active (${awards.length})` : null} key='1'>
              {PollView(awards,'active','awards')}
            </TabPane>
            <TabPane tab={expiredAwards && expiredAwards.payload ? `Expired (${expiredAwards.payload.length})` : null } key='2'>
              { expiredAwards && expiredAwards.payload &&  expiredAwards.payload.length > 0 ? PollView(expiredAwards.payload, 'expired', 'awards') : <h4>Currently no expired awards available.</h4>}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  polls: state.polls,
  awards: state.awards,
  english:state.english
});

export default connect(mapStateToProps, {
  fetchAwards,
})(Awards);
