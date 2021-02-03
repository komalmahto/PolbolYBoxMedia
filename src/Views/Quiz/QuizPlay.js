import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSound from 'use-sound';
import boopSfx from '../../assets/Blop-Mark_DiAngelo-79054334.mp3';
import correctSound from '../../assets/correct.mp3';
import wrongSound from '../../assets/Wrong-answer-sound-effect.mp3';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { FieldTimeOutlined, LogoutOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const QuizPlay = ({ match, history }) => {
  const [questions, setQuestions] = useState({});
  const [play] = useSound(boopSfx);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound);

  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState({});
  const [result, setResult] = useState({});
  const [timer, setTimer] = useState({
    time: 20,
    isOn: false,
  });
  const [final, setFinal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    history.push(`/quiz/levels/${match.params.catId}`);

    setIsModalVisible(false);

  };

  const handleCancel = () => {
    history.push(`/quiz/levels/${match.params.catId}`);

    setIsModalVisible(false);
  };


  const fetchQuiz = async () => {
    await axios
      .get(
        `http://52.66.203.244:2113/api/v1/quiz/start/guest?quizId=${match.params.quizId}`
      )
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data.payload);
      });
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (timer.isOn) {
      let timer1 = setTimeout(
        () => setTimer({ ...timer, time: timer.time - 1 }),
        1000
      );
      if (timer.time <= 0) {
        setTimer({ ...timer, isOn: false });
        const timeOut = async () => {
          await axios
            .get(
              `http://52.66.203.244:2113/api/v1/quiz/timedOut/guest?quesId=${display._id}&resultId=${questions.resultId}`
            )
            .then((res) => {
              setResult(res.data.payload);
              fetchQuiz();
            });
        };
        timeOut();
        wrong();
      }
      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(timer1);
      };
    }
  });

 
  const startQuiz = () => {
    setStart(true);
    setDisplay(questions.questions[index]);
    setTimer({ ...timer, isOn: true });
  };

  const showAns = async (answerId) => {
    setTimer({ ...timer, isOn: false });
    setResult({ hello: 'hello' });
    console.log('answerId', answerId);
    console.log('questionId', display._id);
    console.log('resultId', questions.resultId);
    if (Object.keys(result).length === 0) {
      // play()
      await axios
        .get(
          `http://52.66.203.244:2113/api/v1/quiz/submitAnswer/guest?resultId=${questions.resultId}&quesId=${display._id}&answer=${answerId}`
        )
        .then((res) => {
          console.log(res.data.payload);
          if (res.data.payload.isCorrect) {
            correct();
          } else {
            wrong();
          }
          setResult(res.data.payload);
        });
    }
    if (index + 1 === questions.questions.length) {
      await axios
        .get(
          `http://52.66.203.244:2113/api/v1/quiz/end/guest?resultId=${questions.resultId}`
        )
        .then((res) => {
          console.log(res.data);
          setStart(false);
          showModal();
          setFinal(res.data.payload);
          setDisplay({});
          setResult({});
          setTimer({ ...timer, time: 20, isOn: false });
          setIndex(0);
        });
    }
  };

  const showCorrect = (id) => {
    console.log(id);
    if (Object.keys(result).length > 0) {
      if (id === result.optionMarked) {
        if (result.optionMarked === result.correctOption) {
          return {
            border: '2px solid green',
          };
        } else {
          return {
            border: '2px solid red',
          };
        }
      }
      if (id !== result.optionMarked) {
        if (id === result.correctOption) {
          return {
            border: '2px solid green',
          };
        }
      }
      if (id) {
        if (result.answer) {
          if (id === result.answer) {
            return {
              border: '2px solid red',
            };
          }
        }
      }
    }
  };

  const nextQuestion = () => {
    if (index < questions.questions.length) {
      setDisplay(questions.questions[index+1]);
      setIndex(index + 1);
      setTimer({ ...timer, time: 20, isOn: true });
      setResult({});
    }
  };
  const timerBlink = () => {
    if (timer.time < 5) {
      return {
        color: 'red',
      };
    } else {
      return {
        color: 'black',
      };
    }
  };

  // const endQuiz=async()=>{

  // }

  function showConfirm() {
    confirm({
      title: 'Are you sure you want to quit?',
      icon: <ExclamationCircleOutlined />,

      onOk() {
        history.push(`/quiz/levels/${match.params.catId}`);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <div className='box'>
      <Modal
        title='Quiz Result'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {Object.keys(final).length > 0 && (
          <div className="quiz-result">
            <p>Score: {final.score}</p>
            <p>Correct: {final.countCorrect}</p>
            <p>Total score: {final.totalScore}</p>
            <p>Out of: {final.outOf}</p>
            <p>Accuracy: {final.accuracy}</p>
          </div>
        )}
      </Modal>
      <div className='quiz-box'>
        <div className='quiz-head'>
          <span className='level'>Level 1 </span>
          <span className='timer'>
            <FieldTimeOutlined className='timer-logo' />
            <span style={timerBlink()} className='timer-val'>
              {' '}
              {timer.time} s
            </span>
          </span>
          {start && (
            <span className='questionNo'>
              Question {index + 1} of {questions.questions.length}
            </span>
          )}
        </div>
        {!start && (
          <center style={{ marginTop: '1.5rem' }}>
            {' '}
            <span className='start' onClick={startQuiz}>
              Start Quiz
            </span>
          </center>
        )}
        {start && display && (
          <div className='quiz'>
            <div className='quiz-ques'>
              <p>{display.content.question}</p>
              <div className='options'>
                {display.options.map((op) => (
                  <span
                    className='opt'
                    style={showCorrect(op._id)}
                    onClick={() => showAns(op._id)}
                  >
                    {op.text}
                  </span>
                ))}
              </div>
              {Object.keys(result).length > 0 && (
                <div className='buttons'>
                  <span className='btn' onClick={showConfirm}>
                    Exit <LogoutOutlined />
                  </span>
                  <span className='btn' onClick={nextQuestion}>
                    Next
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlay;
