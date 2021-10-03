import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FieldTimeOutlined } from "@ant-design/icons";
import styles from "./Quiz.module.css"
const { confirm } = Modal;

const QuizPlay = ({ match, history }) => {
  const [questions, setQuestions] = useState({});
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState({});
  const [result, setResult] = useState({});
  const [final, setFinal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hint, setHint] = useState({
    value: 5,
    taken: false,
  });
  const [hintRes, setHintRes] = useState({});
  console.log("result",result);
  console.log("final",final);
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

  const startQuiz = () => {
    if (Object.keys(questions).length > 0) {
      setStart(true);
      setDisplay(questions.questions[index]);
    }
  };

  const showAns = async (answerId) => {
    // setResult({ hello: 'hello' });
    if (Object.keys(result).length === 0) {
      // play()
      await axios
        .get(
          `/quiz/submitAnswer/guest?resultId=${questions.resultId}&quesId=${display._id}&answer=${answerId}`
        )
        .then((res) => {
          console.log(res.data.payload);
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
      setResult({});
      setHint({ ...hint, taken: false });
    }
  };

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
    }
    if (
      display.options.length > 1 &&
      hint.value > 0 &&
      Object.keys(result).length === 0
    ) {
      await axios
        .get(`http://52.66.203.244:2113//quiz/hint/guest?quesId=${id}&cost=1`)
        .then((res) => {
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
        });
    }
  };
  
  return (
    <div>
        <Modal
        visible={isModalVisible}
        className={styles.modal1}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width='400px'
      >
        <h2 style={{fontWeight:'bold', textAlign:'center'}}>Result</h2>
        {Object.keys(final).length > 0 && (
          <div className={styles.quizresult}  >
          <div className={styles.totalscore}>
            <p style={{ textTransform:'none'}}>Total Score: {final.score}/{final.outOf}</p>
            </div>
            <div className={styles.bottom}>
            <div className={styles.cont} style={{ textTransform:'none'}}>
            <p style={{ textTransform:'none'}}><span>Correct answers :</span><span>{final.countCorrect}/{final.maxQuestions}</span> </p>
            <p style={{ textTransform:'none'}}><span>No of Attempts :</span><span>{final.attempts}</span> </p>
            <p style={{ textTransform:'none'}}><span>Accuracy :</span><span> {final.accuracy} %</span></p>
            </div>
            </div>
          </div>
        )}
      </Modal>

      <div className={styles.header}>
        <p className={styles.pHeading}>Quiz</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.head}>
        <h2>Level  {Object.keys(questions).length > 0 ? questions.questions[0].level : ""} </h2>
        <hr className={styles.hr1} />
      </div>
      <div className={styles.qno}>
        {index+1}/
        {Object.keys(questions).length > 0 ? questions.questions.length : ""}
      </div>
      {start && display && (
        <div className={styles.content}>
          <div className={styles.sub1}>
            <div className={styles.quesc}>
              <p className={styles.ques}>{display.content.question}</p>
            </div>
            <div className={styles.btns}>
              <button className={styles.btnsbtn}>Hint</button>
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
          </div>
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
      )}
    </div>
  );
};

export default QuizPlay;
