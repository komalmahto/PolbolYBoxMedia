// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import { Modal } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { FieldTimeOutlined } from "@ant-design/icons";
// import styles from "./Quiz.module.css"
// // import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// const { confirm } = Modal;

// const QuizPlay = ({ match, history }) => {
//   const [questions, setQuestions] = useState({});
//   const [start, setStart] = useState(false);
//   const [index, setIndex] = useState(0);
//   const [display, setDisplay] = useState({});
//   const [result, setResult] = useState({});
//   const [final, setFinal] = useState({});
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [hint, setHint] = useState({
//     value: 5,
//     taken: false,
//   });
//   const [hintRes, setHintRes] = useState({});
//   console.log("result",result);
//   console.log("final",final);
//   const showModal = () => {
//     setIsModalVisible(true);
//   };
//   const [timer, setTimer] = useState({
//     time: 20,
//     isOn: false,
//   });

//   useEffect(() => {
//     if (timer.isOn) {
//       let timer1 = setTimeout(
//         () => setTimer({ ...timer, time: timer.time - 1 }),
//         1000
//       );
//       if (timer.time <= 0) {
//         setTimer({ ...timer, isOn: false });
//         const timeOut = async () => {
//           await axios
//             .get(
//               `/quiz/timedOut/guest?quesId=${display._id}&resultId=${questions.resultId}`
//             )
//             .then((res) => {
//               setResult(res.data.payload);
//             });
//         };
//         timeOut();
//       }
//       // this will clear Timeout when component unmount like in willComponentUnmount
//       return () => {
//         clearTimeout(timer1);
//       };
//     }
//   });

//   const handleOk = () => {
//     history.push(`/quiz/levels/${match.params.catId}`);
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     history.push(`/quiz/levels/${match.params.catId}`);

//     setIsModalVisible(false);
//   };

//   const fetchQuiz = async () => {
//     await axios
//       .get(`/quiz/start/guest?quizId=${match.params.quizId}`)
//       .then((res) => {
//         console.log(res.data);
//         setQuestions(res.data.payload);
//       });
//   };

//   useEffect(() => {
//     fetchQuiz();
//   }, []);

//   useEffect(() => {
//     startQuiz();
//   }, [questions]);

//   const startQuiz = () => {
//     if (Object.keys(questions).length > 0) {
//       setStart(true);
//       setDisplay(questions.questions[index]);
//     }
//   };

//   const showAns = async (answerId) => {
//     // setResult({ hello: 'hello' });
//     if (Object.keys(result).length === 0) {
//       // play()
//       await axios
//         .get(
//           `/quiz/submitAnswer/guest?resultId=${questions.resultId}&quesId=${display._id}&answer=${answerId}`
//         )
//         .then((res) => {
//           console.log(res.data.payload);
//           setResult(res.data.payload);
//         });
//     }
//     if (index + 1 === questions.questions.length) {
//       await axios
//         .get(`/quiz/end/guest?resultId=${questions.resultId}`)
//         .then((res) => {
//           console.log(res.data);
//           setStart(false);
//           showModal();
//           setFinal(res.data.payload);
//           setDisplay({});
//           setResult({});
//           setIndex(0);
//         });
//     }
//   };

//   const showCorrect = (id) => {
//     console.log(id);
//     if (Object.keys(result).length > 0) {
//       if (id === result.optionMarked) {
//         if (result.optionMarked === result.correctOption) {
//           return {
//             border: "2px solid green",
//           };
//         } else {
//           return {
//             border: "2px solid red",
//           };
//         }
//       }
//       if (id !== result.optionMarked) {
//         if (id === result.correctOption) {
//           return {
//             border: "2px solid green",
//           };
//         }
//       }
//       if (id) {
//         if (result.answer) {
//           if (id === result.answer) {
//             return {
//               border: "2px solid red",
//             };
//           }
//         }
//       }
//     }
//   };

//   const nextQuestion = () => {
//     if (index < questions.questions.length) {
//       setDisplay(questions.questions[index + 1]);
//       setIndex(index + 1);
//       setResult({});
//       setHint({ ...hint, taken: false });
//     }
//   };

//   function showConfirm() {
//     confirm({
//       title: "Are you sure you want to quit?",
//       icon: <ExclamationCircleOutlined />,

//       onOk() {
//         history.push(`/quiz/levels/${match.params.catId}`);
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   }

//   const getHint = async (id) => {
//     if (hint === 0) {
//       console.log("buy hint");
//     }
//     if (
//       display.options.length > 1 &&
//       hint.value > 0 &&
//       Object.keys(result).length === 0
//     ) {
//       await axios
//         .get(`http://52.66.203.244:2113//quiz/hint/guest?quesId=${id}&cost=1`)
//         .then((res) => {
//           setHintRes(res.data.payload);
//           console.log(res.data.payload);
//           let index;
//           let ind = display.options.map((val, ind) => {
//             if (val._id === res.data.payload.answer) {
//               index = ind;
//               return ind;
//             }
//           });
//           console.log(index);

//           function generateRandom(min, max) {
//             var num = Math.floor(Math.random() * (max - min + 1)) + min;
//             console.log(num);
//             return num === index ? generateRandom(min, max) : num;
//           }
//           console.log(generateRandom(0, display.options.length - 1), "random");
//           display.options.splice(
//             generateRandom(0, display.options.length - 1),
//             1
//           );
//           setHint({ value: hint.value - 1, taken: true });
//         });
//     }
//   };

//   return (
//     <div>
//         <Modal
//         visible={isModalVisible}
//         className={styles.modal1}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={null}
//         width='400px'
//       >
//         <h2 style={{fontWeight:'bold', textAlign:'center'}}>Result</h2>
//         {Object.keys(final).length > 0 && (
//           <div className={styles.quizresult}  >
//           <div className={styles.totalscore}>
//             <p style={{ textTransform:'none'}}>Total Score: {final.score}/{final.outOf}</p>
//             </div>
//             <div className={styles.bottom}>
//             <div className={styles.cont} style={{ textTransform:'none'}}>
//             <p style={{ textTransform:'none'}}><span>Correct answers :</span><span>{final.countCorrect}/{final.maxQuestions}</span> </p>
//             <p style={{ textTransform:'none'}}><span>No of Attempts :</span><span>{final.attempts}</span> </p>
//             <p style={{ textTransform:'none'}}><span>Accuracy :</span><span> {final.accuracy} %</span></p>
//             </div>
//             </div>
//           </div>
//         )}
//       </Modal>

//       <div className={styles.header}>
//         <p className={styles.pHeading}>Quiz</p>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
//           neque.
//         </p>
//       </div>
//       <div className={styles.gap}>
//       <div className={styles.head}>
//         <span >Level  {Object.keys(questions).length > 0 ? questions.questions[0].level : ""} </span>
//       </div>
//       <div className={styles.qno}>
//         {index+1}/
//         {Object.keys(questions).length > 0 ? questions.questions.length : ""}
//       </div>
//       {start && display && (
//         <div className={styles.content}>
//           <div className={styles.sub1}>
//             <div className={styles.quesc}>
//               <p className={styles.ques}>{display.content.question}</p>
//             </div>
//             <div className={styles.btns}>
//               <button className={styles.btnsbtn}>Hint</button>
//               <button className={styles.btnsbtn}>Watch Ad</button>
//             </div>
//           </div>
//           <div className={styles.options1}>
//             {display.options.map((option, index) => (
//               <div
//                 key={index}
//                 className={styles.option}
//                 onClick={() => showAns(option._id)}
//                 style={showCorrect(option._id)}
//               >
//                 {option.text}
//               </div>
//             ))}
//             <div className={`${styles.btns} ${styles.abs}`}>
//             {Object.keys(result).length > 0 && (
//               <>
//                 <button className={styles.btnsbtn} onClick={showConfirm}>
//                   Exit
//                 </button>
//                 <button className={styles.btnsbtn} onClick={nextQuestion}>
//                   Next
//                 </button>
//               </>
//             )}
//           </div>
//           </div>

//         </div>
//       )}
//             </div>

//     </div>
//   );
// };

// export default QuizPlay;
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import useSound from "use-sound";
import boopSfx from "../../assets/src_assets_Blop-Mark_DiAngelo-79054334.mp3";
import correctSound from "../../assets/src_assets_state-change_confirm-up.wav";
import wrongSound from "../../assets/src_assets_Wrong-answer-sound-effect.mp3";
import tik from "../../assets/src_assets_ticktok.wav";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import light from "../../assets/light-bulb-1.png";
import { FieldTimeOutlined, LogoutOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import lose from "../../assets/lose.png";
import win from "../../assets/Win.png";
import DownloadModal from "../../Components/Modal/Modal";
import styles from "./Quiz.module.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import * as api from "../../api/index";

const { confirm } = Modal;

const QuizPlay = ({ match, history, auth }) => {
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
  const [hint, setHint] = useState({
    value: 5,
    taken: false,
  });
  const [hintModal, setHintModal] = useState(false);
  const [hintRes, setHintRes] = useState({});
  const [alert, setAlert] = useState(false);
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getHints = async () => {
    let data;
    console.log(JSON.parse(auth.token));
    try {
      if (api.isAuthenticated()) {
        data = await axios.get(`wallet/fetchBalance`, {
          headers: {
            Authorization: `bearer ${JSON.parse(auth.token)}`,
          },
        });
        // data.payload.hints
        console.log(data);
        setHint({ value: 0, taken: true });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHints();
  }, []);

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
      .get(`/quiz/start/guest?quizId=${match.params.quizId}`)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data.payload);
      });
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    startQuiz();
  }, [questions]);
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
              `/quiz/timedOut/guest?quesId=${display._id}&resultId=${questions.resultId}`
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
    if (Object.keys(questions).length > 0) {
      setStart(true);
      setDisplay(questions.questions[index]);
      setTimer({ ...timer, isOn: true });
    }
  };

  const showAns = async (answerId) => {
    setTimer({ ...timer, isOn: false });
    // setResult({ hello: 'hello' });
    console.log("answerId", answerId);
    console.log("questionId", display._id);
    console.log("resultId", questions.resultId);
    if (Object.keys(result).length === 0) {
      // play()
      await axios
        .get(
          `/quiz/submitAnswer/guest?resultId=${questions.resultId}&quesId=${display._id}&answer=${answerId}`
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
        .get(`/quiz/end/guest?resultId=${questions.resultId}`)
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
            border: "2px solid green",
          };
        } else {
          return {
            border: "2px solid red",
          };
        }
      }
      if (id !== result.optionMarked) {
        if (id === result.correctOption) {
          return {
            border: "2px solid green",
          };
        }
      }
      if (id) {
        if (result.answer) {
          if (id === result.answer) {
            return {
              border: "2px solid red",
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
      setHint({ ...hint, taken: false });
      setAlert(false);
    }
  };
  const timerBlink = () => {
    if (timer.time < 5) {
      return {
        color: "red",
      };
    } else {
      return {
        color: "black",
      };
    }
  };

  // const endQuiz=async()=>{

  // }

  function showConfirm() {
    confirm({
      title: "Are you sure you want to quit?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        history.push(`/quiz/levels/${match.params.catId}`);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const getHint = async (id) => {
    if (hint === 0) {
      console.log("buy hint");
      setHintModal(true);
    }
    if (
      display.options.length > 1 &&
      hint.value > 0 &&
      timer.time > 0 &&
      Object.keys(result).length === 0
    ) {
      let res;

      try {
        if (api.isAuthenticated()) {
          res = await axios.get(`/quiz/hint?quesId=${id}&cost=1`, {
            headers: {
              Authorization: `bearer ${JSON.parse(auth.token)}`,
            },
          });
          setHintRes(res.data.payload);
          console.log(res.data.payload);
          let index;
          let ind = display.options.map((val, ind) => {
            if (val._id === res.data.payload.answer) {
              index = ind;
              return ind;
            }
          });
          console.log(index);

          function generateRandom(min, max) {
            var num = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log(num);
            return num === index ? generateRandom(min, max) : num;
          }
          console.log(generateRandom(0, display.options.length - 1), "random");
          display.options.splice(
            generateRandom(0, display.options.length - 1),
            1
          );
          setHint({ value: hint.value - 1, taken: true });
        }
      } catch (error) {
        console.log(error);
      }
      // await axios
      //   .get(`/quiz/hint/guest?quesId=${id}&cost=1`)
      //   .then((res) => {
      //     setHintRes(res.data.payload);
      //     console.log(res.data.payload);
      //     let index;
      //     let ind = display.options.map((val, ind) => {
      //       if (val._id === res.data.payload.answer) {
      //         index = ind;
      //         return ind;
      //       }
      //     });
      //     console.log(index);

      //     function generateRandom(min, max) {
      //       var num = Math.floor(Math.random() * (max - min + 1)) + min;
      //       console.log(num);
      //       return num === index ? generateRandom(min, max) : num;
      //     }
      //     console.log(generateRandom(0, display.options.length - 1), "random");
      //     display.options.splice(
      //       generateRandom(0, display.options.length - 1),
      //       1
      //     );
      //     setHint({ value: hint.value - 1, taken: true });
      //   });
    }
  };
  useEffect(() => {
    if (alert === false) {
      if (timer.time < 6) {
        tiktok();
        setAlert(true);
      }
    }
  }, [timer.time]);

  const confirmHint = () => {
    if (hint.value > 0) {
      if (Object.keys(result).length === 0) {
        setTimer({ ...timer, isOn: false });

        confirm({
          title: `you have ${hint.value} hints`,
          icon: <ExclamationCircleOutlined />,
          content: "Are you sure you want to use one",
          onOk() {
            getHint(display._id);
            setTimer({ ...timer, isOn: true });
          },
          onCancel() {
            console.log("Cancel");
            setTimer({ ...timer, isOn: true });
          },
        });
      }
    } else {
      if (Object.keys(result).length === 0) {
        setTimer({ ...timer, isOn: false });

        setHintModal(true);
      }
    }
  };

  return (
    <div className={styles.box1}>
      <DownloadModal
        isModalVisible={isDownloadModalVisible}
        setIsModalVisible={setIsDownloadModalVisible}
        text={"To enjoy the complete experience of quiz download our app."}
      />
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="400px"
      >
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Result</h2>
        {Object.keys(final).length > 0 && (
          <div
            className="quiz-result"
            style={{
              backgroundImage: `url(${final.score < 400 ? lose : win})`,
              textTransform: "none",
            }}
          >
            <div className="total-score">
              <p style={{ textTransform: "none" }}>
                Total Score: {final.score}/{final.outOf}
              </p>
            </div>
            <div className="bottom">
              <div className="cont" style={{ textTransform: "none" }}>
                <p style={{ textTransform: "none" }}>
                  <span>Correct answers :</span>
                  <span>
                    {final.countCorrect}/{final.maxQuestions}
                  </span>{" "}
                </p>
                <p style={{ textTransform: "none" }}>
                  <span>No of Attempts :</span>
                  <span>{final.attempts}</span>{" "}
                </p>
                <p style={{ textTransform: "none" }}>
                  <span>Accuracy :</span>
                  <span> {final.accuracy} %</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        onCancel={() => {
          setHintModal(false);
          setTimer({ ...timer, isOn: true });
        }}
        footer={null}
        visible={hintModal}
      >
        <center className={styles.BuyHints}>Buy Hints</center>
        <div>
          <div className={styles.hints}>
            <span className={styles.noOf}>
              <i className="fas fa-rocket"> </i>5 hints
            </span>
            <span className={styles.val}>10 IKC</span>
          </div>
        </div>
      </Modal>

      <div className={styles.header}>
        <p className={styles.pHeading}>Quiz</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>

      <div className={styles.level}>
        <span className="level">Level 1 </span>
      </div>
      <div className={styles.quizBox}>
        <div className={styles.quizHead}>
          {start && (
            <span className={styles.questionNumber}>
              {index + 1} / {questions.questions.length}
            </span>
          )}
          {/* <div className="hint"><span>{hint.value}</span><img style={{height:'35px'}} src={light}></img></div> */}
          <span className={styles.timer}>
            <FieldTimeOutlined className={styles.logo} />
            <span style={timerBlink()} className="timer-val">
              {" "}
              {timer.time} s
            </span>
          </span>
        </div>

        {/*!start && (
          <center style={{ marginTop: '1.5rem' }}>
            {' '}
            <span className='start' onClick={startQuiz}>
              Start Quiz
            </span>
          </center>
        )*/}
        {/* {start && display && (
          <div className="quiz ">
            <div className="quiz-ques">
              <p className={styles.ques}>{display.content.question}</p>
              <div className="options">
                {display.options.map((op) => (
                  <span
                    className="opt"
                    style={showCorrect(op._id)}
                    onClick={() => showAns(op._id)}
                  >
                    {op.text}
                  </span>
                ))}
              </div>
              <div className="hint-btn">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsDownloadModalVisible(true);
                  }}
                >
                  <img style={{ height: "25px" }} src={light}></img>Hint
                </span>{" "}
              </div>

              <div className="buttons">
                {Object.keys(result).length > 0 && (
                  <>
                    <span className="btn" onClick={showConfirm}>
                      Exit
                    </span>
                    <span className="btn" onClick={nextQuestion}>
                      Next
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )} */}

        {start && display && (
          <div className={styles.content}>
            <div className={styles.sub1}>
              <div className={styles.quesc}>
                <p className={styles.ques}>{display.content.question}</p>
              </div>
              <div className={styles.btns}>
                {auth.token && (
                  <button onClick={confirmHint} className={styles.btnsbtn}>
                    Hint
                  </button>
                )}
                <button className={styles.btnsbtn}>Watch Ad</button>
              </div>
            </div>
            <div className={styles.options1}>
              {display.options.map((option, index) => (
                <div
                  key={index}
                  className={styles.option}
                  onClick={() => showAns(option._id)}
                  style={showCorrect(option._id)}
                >
                  {option.text}
                </div>
              ))}
              <div className={`${styles.btns} ${styles.abs}`}>
                {Object.keys(result).length > 0 && (
                  <>
                    <button className={styles.btnsbtn} onClick={showConfirm}>
                      Exit
                    </button>
                    <button className={styles.btnsbtn} onClick={nextQuestion}>
                      Next
                    </button>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(QuizPlay);
