import React, { useState } from 'react';
import Graph from '../Result/Graph';
import Bar from '../Result/Bar';
import {
  PieChartOutlined,
  ArrowRightOutlined,
  LikeOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  ShareAltOutlined,
  HeartTwoTone
} from '@ant-design/icons';
import { Rate , Radio, Input, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import { Modal, Button } from 'antd';
import moment from 'moment';
import Stars from 'react-stars-display';
import StarRatings from 'react-star-ratings';
import ShareModal from '../Modal/ShareModal';

const { TextArea } = Input;

const PollCard = ({
  type2,
  p,
  icons,
  getExpiryString1,
  type,
  setType3,
  setType3Data,
  english,
  isAward
}) => {
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState('');
  const history = useHistory();
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [answer,setAnswer]= useState({key:0,comment:''});
  const [voteModalData, setVoteModalData] = useState({});

  const showModal = (id) => {
    setIsModalVisible(true);
    setId(id);
  };
  const setIt = (p) => {
    setType3(true);
    setType3Data(p);
  };
  const [comments, setComments] = useState([]);

  const handleOk = () => {
    setIsCommentModal(false);
  };

  const handleCancel = () => {
    setIsCommentModal(false);
  };
  const getComments = (id) => {
    console.log(id);

    axios.get(`/common/polls/comments?poll=${id}`).then((res) => {
      console.log(res.data.payload.data);
      setComments(res.data.payload.data);
      setIsCommentModal(true);
    });
  };
  const share = (url) => {
    setShareUrl(url);
    setIsShareModalVisible(true);
  };

  const awardPath = () => {
    if (type2 === 'awards' && p.hasCategories) {
      return `/award/categories/${p._id}`;
    }
    if (type2 === 'awards' && !p.hasCategories && !p.isSubcategory) {
      return `/award/subcat/${p._id}`;
    }
    // if(type2 === 'awards' && p.isSubcategory ){
    //   return ``
    // }
  };

  const answerSubmitHandler = (id) => {
    const authToken = localStorage.getItem("authToken").split(" ")[1];
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    const bodyParameters = {
      poll: id,
      answer: answer.key,
      comment: answer.comment,
    };

    if (answer.comment === '') { delete bodyParameters.comment }

    axios
      .post(
        "/post/add-answer",
        bodyParameters,
        config
      )
      .then((res) => {
        setIsVoteModal(false);
        setVoteModalData({});
      })
      .catch((err) => console.log(err));
  }

  const Options = () => {
    return (
      <Radio.Group onChange={(e) => { setAnswer({ ...answer, key: e.target.value }) }} value={answer.key}>
        <Space direction="vertical">
          {
            voteModalData.options.map((option) => {
              return <Radio value={option.key}>{english ? option.name : option.name_hindi}</Radio>
            })
          }
        </Space>
      </Radio.Group>
    );
  }

  return (
    <>
      {/*  <Graph
        key={p._id}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={id}
    />*/}
      <ShareModal
        shareUrl={shareUrl}
        isShareModalVisible={isShareModalVisible}
        setIsShareModalVisible={setIsShareModalVisible}
      />
      <Bar
        key={p._id}
        id={id}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Modal
        title='Comments'
        visible={isCommentModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{
          padding:'10px'
        }}
      >
        {comments &&
          comments.length > 0 &&
          comments.map((c) => (
            <div className='comment'>
              <img style={{ width: '30px' }} src={c.user.avatar} alt='' />
              <div className='det'>
                <span>
                  @{c.user.userName} Voted{' '}
                  {typeof c.answer === 'number' ? (
                    <StarRatings
                      rating={c.answer}
                      starRatedColor='brown'
                      numberOfStars={c.answer}
                      starDimension='15px'
                      starSpacing='5px'
                      name='rating'
                    />
                  ) : (
                    `${c.answer}`
                  )}{' '}
                </span>
                <p>{c.comment}</p>
                <p className='bot'>
                  {c.likesCount > 0 && (
                    <span>
                      {c.likesCount} {c.likesCount === 1 ? 'like' : 'likes'}
                    </span>
                  )}{' '}
                  <span>{moment(c.createdAt).fromNow()}</span>
                </p>
              </div>
            </div>
          ))}
      </Modal>


      <Modal
        visible={isVoteModal}
        onOk={() => { setIsVoteModal(false); setAnswer({ ...answer, key: 0 }); setVoteModalData({}) }}
        onCancel={() => { setIsVoteModal(false); setAnswer({ ...answer, key: 0 }); setVoteModalData({}) }}
        footer={null}>
        <h4>{voteModalData.question}</h4>
        {voteModalData.type === 'bar' ?
          <div>
            <Rate count={10} value={answer.key} onChange={(value) => { setAnswer({ ...answer, key: value }) }} />
          </div> : <span><Options /></span>
        }
        <div style={{ marginTop: '5px' }}>
          <TextArea
            value={answer.comment}
            onChange={({ target: { value } }) => {
              setAnswer({ ...answer, comment: value })
            }}
            placeholder={english ? "Comment (optional)" : "टिप्पणी (वैकल्पिक)"}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" onClick={() => { answerSubmitHandler(voteModalData.id) }}>Submit</Button>
        </div>
      </Modal>


      <div
        // to={awardPath()}
        onClick={() => type2 === 'awards' && history.push(awardPath())}
        className = { isAward  ? "award-po" : "po"}
      >
        <div className={
          type2 === 'polls'
            ? 'long-card long-card-hor'
            : 'long-card long-card-ver'
        }>
          <div className='lef'>
            {' '}
            <span className='heading'>
              {type2 === 'polls' && (
                <img
                  style={{ height: '25px', width: '25px', marginRight: '1rem' }}
                  src={
                    type2 === 'polls' ? icons[p.categories[0]] : icons[p.type[0]]
                  }
                />
              )}
              {type2 === 'polls'
                ? `Poll on ${p.categories[0]}`
                : `${getExpiryString1 && getExpiryString1(p.lifeSpan)}`}
            </span>
            {english && (

              <div
                className='long-card-img'
                style={{
                  backgroundImage: `url(${type2 === 'polls' ? p.image : p.icon ? p.icon : p.image
                    })`,
                }}
              ></div>
            )}
            {!english && (
              <div
                className='long-card-img'
                style={{
                  backgroundImage: `url(${type2 === 'polls'
                      ? p.image_hindi
                      : p.icon_hindi
                        ? p.icon_hindi
                        : p.image
                    })`,
                }}
              ></div>
            )}
          </div>
          <div className='long-card-desc'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {type2 === 'awards' && p.hasCategories && (
                <Link
                  style={{ textAlign: 'center' }}
                  to={`/award/categories/${p._id}`}
                >
                  <ArrowRightOutlined />
                </Link>
              )}
              {type2 === 'awards' && !p.hasCategories && !p.isSubcategory && (
                <Link
                  style={{ textAlign: 'center' }}
                  to={`/award/subcat/${p._id}`}
                >
                  <ArrowRightOutlined />
                </Link>
              )}
              {type2 === 'awards' && p.isSubcategory && (
                <span style={{ textAlign: 'center' }}>
                  <ArrowRightOutlined />
                </span>
              )}
              <p>{english ? p.question : p.question_hindi}</p>
            </div>

          </div>
        </div>
        <div>
          <div className='poll-but'>
            {' '}
            {type2 === 'polls' && (
              <div className='ico'>
                <span className='i'>
                  <span style={{ marginRight: '0.3rem' }}>
                    <i style={{ color: 'red' }} className="fas fa-heart"></i>                 </span>
                  {p.likesCount}
                </span>
                <span
                  style={{ cursor: 'pointer' }}
                  className='i'
                  onClick={() => getComments(p._id)}
                >
                  <span style={{ marginRight: '0.3rem' }}>
                    <CommentOutlined />
                  </span>
                  {p.commentCount}
                </span>
                {type === 'active' && <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => share(p.url)}
                  className='i'
                >
                  <span>
                    <ShareAltOutlined />
                  </span>
                </span>}
              </div>
            )}
            {type2 === 'polls' && type && type === 'active' && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsVoteModal(true); setVoteModalData({
                    type: p.type,
                    question: english ? p.question : p.question_hindi,
                    id: p._id,
                    options: p.options
                  })
                }}
                style={{ color: '#56a7ff', cursor: 'pointer' }}
              >
                {english ? 'Vote Now' : 'मतदान करें'}
              </span>
            )}
            {type2 === 'polls' && type && type === 'expired' && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => showModal(p._id)}
                style={{ color: '#56a7ff', cursor: 'pointer' }}
              >
                {english ? 'View Result' : 'परिणाम'} <i style={{ color: '#56a7ff' }}
                  className="fas fa-chart-pie"></i>
              </span>
            )}
            <div className='read-more-poll'>
              {type2 === 'polls' && (
                <Link
                  style={{ textAlign: 'right' }}
                  onClick={() =>
                    english
                      ? window.open(`${p.url}`)
                      : window.open(`${p.url_hindi}`)
                  }
                >
                  Read more
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollCard;
