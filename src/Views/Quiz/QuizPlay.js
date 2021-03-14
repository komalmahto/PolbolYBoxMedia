import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import useSound from 'use-sound';
import boopSfx from '../../assets/Blop-Mark_DiAngelo-79054334.mp3';
import correctSound from '../../assets/state-change_confirm-up.wav';
import wrongSound from '../../assets/Wrong-answer-sound-effect.mp3';
import tik from '../../assets/ticktok.wav'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import light from '../../assets/light-bulb-1.png'
import { FieldTimeOutlined, LogoutOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import lose from '../../assets/lose.png'
import win from '../../assets/Win.png'
const { confirm } = Modal;

const QuizPlay = ({ match, history,english:{english} }) => {
  const [questions, setQuestions] = useState({});
  const [play] = useSound(boopSfx);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound);
  const [tiktok] = useSound(tik);
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
  const [hint,setHint]=useState({
    value:5,
    taken:false
  })
  const [hintRes,setHintRes]=useState({});
  const [alert,setAlert]=useState(false)

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
        `api/v1/quiz/start/guest?quizId=${match.params.quizId}`
      )
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data.payload);
        
      });
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() =>{
    startQuiz();

  },[questions])
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
              `api/v1/quiz/timedOut/guest?quesId=${display._id}&resultId=${questions.resultId}`
            )
            .then((res) => {
              setResult(res.data.payload);
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
    if(Object.keys(questions).length>0){
    setStart(true);
    setDisplay(questions.questions[index]);
    setTimer({ ...timer, isOn: true });
    }
  };

  const showAns = async (answerId) => {
    setTimer({ ...timer, isOn: false });
    // setResult({ hello: 'hello' });
    console.log('answerId', answerId);
    console.log('questionId', display._id);
    console.log('resultId', questions.resultId);
    if (Object.keys(result).length === 0) {
      // play()
      await axios
        .get(
          `api/v1/quiz/submitAnswer/guest?resultId=${questions.resultId}&quesId=${display._id}&answer=${answerId}`
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
          `api/v1/quiz/end/guest?resultId=${questions.resultId}`
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
      setDisplay(questions.questions[index + 1]);
      setIndex(index + 1);
      setTimer({ ...timer, time: 20, isOn: true });
      setResult({});
      setHint({...hint,taken:false})
    setAlert(false)
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

  const getHint=async (id) =>{
    if(hint===0){
      console.log("buy hint")
    }
    if(display.options.length>1&& hint.value>0 &&timer.time>0 && Object.keys(result).length ===0){
  await axios.get(`http://52.66.203.244:2113/api/v1/quiz/hint/guest?quesId=${id}&cost=1`)
  .then((res)=>{
    setHintRes(res.data.payload)
    console.log(res.data.payload)
    let index;
    let ind=display.options.map((val,ind)=>{
      if(val._id===res.data.payload.answer){
        index=ind
        return ind
      }
    })
    console.log(index)
    
    function generateRandom(min, max) {
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(num)
      return (num === index) ? generateRandom(min, max) : num;
  }
  console.log(generateRandom(0,display.options.length-1),"random");
  display.options.splice(generateRandom(0,display.options.length-1),1)
    setHint({value:hint.value-1,taken:true})

  })
    }

  }
  useEffect(()=>{
    if(alert===false){
    if(timer.time<6){
      tiktok()
      setAlert(true)
    }
  }
  },[timer.time])
 
  

  return (
    <div className='box'>
   
      <Modal
        title='Result'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width='400px'
      >
        {Object.keys(final).length > 0 && (
          <div className='quiz-result' style={{backgroundImage:`url(${final.score<400 ?lose:win})`}} >
          <div className="total-score">
            <p >Total Score: {final.score}/{final.outOf}</p>
            </div>
            <div className="bottom">
            <div className="cont">
            <p><span>Correct Answers :</span><span>{final.countCorrect}/{final.maxQuestions}</span> </p>
            <p><span>No of Attempts :</span><span>{final.attempts}</span> </p>
            <p><span>Accuracy :</span><span> {final.accuracy} %</span></p>
            </div>
            </div>
          </div>
        )}
      </Modal>
      <div className='quiz-box'>
      
        <div className='quiz-head'>
        <div className="hint"><span>{hint.value}</span><img style={{height:'35px'}} src={light}></img></div>
          <span className='level'>{english?'Level':'स्तर'} 1 </span>
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
        {/*!start && (
          <center style={{ marginTop: '1.5rem' }}>
            {' '}
            <span className='start' onClick={startQuiz}>
              Start Quiz
            </span>
          </center>
        )*/}
        {start && display && (
          <div className='quiz '>
            <div className='quiz-ques'>
              <p className="modal">{display.content.question}</p>
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
              <div className="hint-btn"><span style={{cursor:'pointer'}} onClick={()=>getHint(display._id)}><img style={{height:'25px'}} src={light}></img>{english?'Hint':'हिंट'}</span> </div>
              
                <div className='buttons'>
                {Object.keys(result).length > 0 && (
                  <>
                  <span  className='btn' onClick={showConfirm}>
                    Exit 
                  </span>
                  <span className='btn' onClick={nextQuestion}>
                    Next
                  </span>
                  </>
                  )}
                </div>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  english: state.english,
 });
 
 export default connect(mapStateToProps)(QuizPlay);