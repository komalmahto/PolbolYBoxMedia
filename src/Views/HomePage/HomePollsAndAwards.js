import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { Checkbox, Row, Col } from 'antd';
import { fetchPolls } from '../../Actions/PollsAction';
import { fetchAwards } from '../../Actions/AwardsAction';
import { connect } from 'react-redux';
import moment from 'moment';
import { icons, cats, catspa } from '../../Components/icons/Icons'
import PollCard from '../../Components/Polls/PollCard'
import axios from '../../axios'
import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'antd';
import NomineeCard from '../../Components/Cards/NomineeCard'
import JuryCard from '../../Components/Cards/JuryCard'
import AwardResult from '../../Components/Result/AwardResult'
const { TabPane } = Tabs;

const HomePollsAndAwards = ({ fetchPolls, fetchAwards, polls: { polls }, awards: { awards }, english: { english },auth:{token} }) => {
  const [selectedTagsPolls, setSelectedTagsPolls] = useState([]);
  const [selectedTagsAwards, setSelectedTagsAwards] = useState([])
  const [pollsBasedOnCategory, setPollsBasedOnCategory] = useState({})
  const [expiredAwards, setExpiredAwards] = useState({})
  const [type3Data, setType3Data] = useState({});
  const [type3, setType3] = useState(false)
  const [comm, setComm] = useState([])
  const [vote,setVote]=useState(false)

  const history = useHistory();
  const types = [
    "Bollywood",
    "Sports",
    "Politics"
  ]

  useEffect(() => {
    fetchPolls(english);
    fetchAwards();
    fetchPollsSelected();
    fetchExpiredAwards();
  }, [english]);
  useEffect(() => {
    fetchPollsSelected();

  }, [selectedTagsPolls,vote,token])

  const fetchExpiredAwards = async (page) => {
    try {
      const response = await axios.get(`/award/fetchAwardsAndCategories?mode=expired&hindi=${!english}`);
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
      if(token){
      const response = await axios.get(`/polls?mode=active`,{
        headers: {
            Authorization: {
              toString() {
                return `Bearer `+JSON.parse(token);
              }
            }
        }, 
        params: {
          page,
          categories: selectedTagsPolls.length > 0 ? queryParam : undefined
        }
      });
      const response1 = await axios.get(`/polls?mode=expired`,{
        headers: {
            Authorization: {
              toString() {
                return `Bearer `+JSON.parse(token);
              }
            }
        }, 
        params: {
          page,
          categories: selectedTagsPolls.length > 0 ? queryParam : undefined
        }
      });
      console.log(response1)
      console.log(response.data.payload.payload.concat(response1.data.payload.payload))
      const final=response.data.payload.payload.concat(response1.data.payload.payload)
      console.log(final)
      response.data.payload.payload=final
      const responseJSON = response.data;
      setPollsBasedOnCategory(responseJSON);

      console.log(responseJSON, "selected news");
    }
    else{
      const response = await axios.get(`/common/polls`, {
        params: {
          page,
          categories: selectedTagsPolls.length > 0 ? queryParam : undefined
        }
      });
      const responseJSON = response.data;
      setPollsBasedOnCategory(responseJSON)

      console.log(responseJSON, "selected news");

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
    setSelectedTagsPolls(checkedValues);
  }

  function onChangeSel(checkedValues) {
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
        fontSize: "1rem"
      };
    }
    else {
      return {
        fontSize: '1rem',
      }
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
        fontSize: '1rem'
      };
    }
    else {
      return {
        fontSize: '1rem',
      }
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

  const fetchComments = async () => {
    if (type3Data && type3Data._id) {
      await axios
        .get(`award/audienceComments?id=${type3Data && type3Data._id}`)
        .then((res) => {
          console.log(res, 'COMMENTS');
          setComm(res.data.payload);
        }).catch(err => {
          console.log('hi', err);
        })
    }
  };

  useEffect(() => {
    fetchComments()
  }, [type3Data])


  const getExpiryString1 = (expiryTime) => {
    const lifeEndTime = moment(expiryTime);
    const now = moment();
    let duration = moment.duration(lifeEndTime.diff(now));
    console.log(duration, "duration")
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
    return minDiff < 0 ? 'show has expired' : `${duration._data.hours} hours ${duration._data.minutes} minutes left!!`;
  };
  const grid = (data, type, type2) => {
    console.log(data, 'data');
    let useData;
    if (type2 === 'polls') {
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
    }
    if (type2 === 'awards') {
      if (type === 'active') {
        if (selectedTagsAwards.length > 0) {
          useData =
            data && data.length > 0 &&
            data.filter((l) => { return selectedTagsAwards.includes(l.type[0]) }).filter((p) => {
              return getExpiryString(p.lifeSpan) > 0;
            });
        }
        else {
          useData =
            data && data.length > 0 &&
            data.filter((p) => {
              return getExpiryString(p.lifeSpan) > 0;
            });
          console.log(useData);
        }
      } else if (type === 'expired') {
        console.log(expiredAwards.payload, 'exp aw');
        if (selectedTagsAwards.length > 0) {
          useData =
            data && data.length > 0 &&
            data.filter((l) => { return selectedTagsAwards.includes(l.categories[0]) }).filter((p) => {
              return getExpiryString(p.lifeSpan) < 0;
            });
        }
        else {
          useData =
            data && data.length > 0 &&
            data.filter((p) => {
              return getExpiryString(p.lifeSpan) < 0;
            });
          console.log(useData);
        }
      }
    }
    const setIt = (p) => {
      console.log('setIt called', p)
      if (p.isSubcategory) {
        setType3(true)
        setType3Data(p)
      }
    }




    return (
      <div className='grid-46'>
        <div style={{ backgroundColor: '#ffff', textAlign: 'center' }}>
          {type2 === 'polls' && <Checkbox.Group
            className='tags'
            style={{ width: '100%' }}
            onChange={onChange}
          >
            {type2 === 'polls' && catspa.map((p) => (
              <label className="cur" style={checkChecked(p)}>
                {p}
                <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
              </label>
            ))}
          </Checkbox.Group>}
          {type2 === 'awards' && <Checkbox.Group
            className='tags'
            style={{ width: '100%' }}
            onChange={onChangeSel}
          >
            {type2 === 'awards' && catspa.map((p) => (
              <label className="cur" style={checkChecked1(p)}>
                {p}
                <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
              </label>
            ))}
          </Checkbox.Group>}
        </div>
        <div style={{ overflowY: 'scroll' }}>
          <div className="top">
            {/*   <span>
              {useData && useData.length}{' '}
              {data && data.length===0&& "0"}{" "}
              {type === 'active' ? 'active' : 'expired'} {type2==='polls'?'polls':'Awards'}
         </span>
            <span onClick={()=>{type2==='polls'?history.push('/polls'):history.push("/awards")}}  className="viewAll">View all</span>*/}
          </div>
          <div className="grid-2" >
            {!token&&useData &&
              useData.slice(0, 6).map((p) => (

                p.hidden === false &&
                <div onClick={() => setIt(p)}>
                  <PollCard setVote={setVote} vote={vote} english={english} type={type} icons={icons} type2={type2} p={p} getExpiryString1={getExpiryString1} />
                </div>
              ))}
               {token&&useData &&
              useData.slice(0, 6).map((p) => (

              
                <div onClick={() => setIt(p)}>
                  <PollCard setVote={setVote} english={english} type={type} icons={icons} type2={type2} p={p} getExpiryString1={getExpiryString1} />
                </div>
              ))}

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }} className="top">
            <span onClick={() => { type2 === 'polls' ? history.push('/polls') : history.push("/awards") }} className="viewAll">View all</span>
          </div>
        </div>
      </div>
    );
  };


  const handleOk = () => {
    setType3(false);
  };

  const handleCancel = () => {
    setType3(false);
  };
  const checkLength = (data, type) => {

    let useData1 = []
    if (type === 'polls') {

      useData1 =
        Object.keys(data).length > 0 &&
        data.payload.payload.filter((p) => {
          return getExpiryString(p.lifeSpan) > 0;
        });
      console.log(useData1);
      return useData1.length;
    }
    if (type === 'awards') {
      console.log(data, "datata")
      if (data && data.length > 0) {
        return 1
      }
      else {
        return 0
      }


    }

  }

  return (
    <div className='card-container'>
      <Modal footer={null} title={type3Data && Object.keys(type3Data).length > 0 && type3Data.heading} visible={type3} onOk={handleOk} onCancel={handleCancel}>
        {/* <h3>{type3Data&& Object.keys(type3Data).length>0 && type3Data.heading}</h3>*/}
        <Tabs size={'small'} onChange={callback} type="card">
          <TabPane tab="Nominees" key="1">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', justifyItems: 'center', gridGap: '1.5rem' }}>
              {type3Data && Object.keys(type3Data).length > 0 && type3Data.nominations.map((p) => (
                <NomineeCard p={p} />
              ))}
            </div>
          </TabPane>
          <TabPane tab="Jury" key="2">
            <div tyle={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', justifyItems: 'center', gridGap: '1.5rem' }}>
              {type3Data && Object.keys(type3Data).length > 0 && type3Data.jurys.map((p) => (
                <JuryCard p={p} />
              ))}
            </div>
          </TabPane>

          <TabPane tab="Results" key="3">
            <AwardResult id={type3Data && Object.keys(type3Data).length > 0 && type3Data._id} />
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
      <Tabs className={'tabsStyl'} size={'large'} type='card'>
        <TabPane className="cat" id="cat" tab={english ? 'Polls' : 'मतदान'} key='1'>
          <Tabs className={'pp'} size={'small'} defaultActiveKey={checkLength(pollsBasedOnCategory, 'polls') === 0 ? '2' : '1'} onChange={callback}>
            <TabPane tab='Active' key='1'>
              {grid(pollsBasedOnCategory, 'active', 'polls')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {grid(pollsBasedOnCategory, 'expired', 'polls')}
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab={english ? 'Awards' : 'अवार्डस'} key='2'>
          <Tabs className={'pp'} size={'small'} defaultActiveKey={checkLength(awards, 'awards') === 0 ? '2' : '1'} onChange={callback}>
            <TabPane tab='Active' key='1'>
              {grid(awards, 'active', 'awards')}
            </TabPane>
            <TabPane tab='Expired' key='2'>
              {grid(expiredAwards.payload, 'expired', 'awards')}
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  polls: state.polls,
  awards: state.awards,
  english: state.english,
  auth:state.auth
});

export default connect(mapStateToProps, {
  fetchPolls, fetchAwards
})(HomePollsAndAwards);
