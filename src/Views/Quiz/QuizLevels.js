import React, { useState, useEffect } from "react";
import axios from "../../axios";
import styles from "./Quiz.module.css";
import { FaPlay } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function QuizLevels({ match }) {
  const history=useHistory();
  const { catId } = match.params;
  const [levels, setLevels] = useState([]);

  const fetchQuiz = async () => {
    const { data } = await axios.get(
      `quiz/fetchQuiz/guest?categoryId=${catId}`
    );
    setLevels(data.payload.quizzes);
  };

  const clickHandler=(level)=>{
    history.push(`/quiz/level/${catId}/${level._id}`)
  }

  useEffect(() => {
    fetchQuiz();
  }, []);
  console.log(levels);
  return (
    <div>
      {/* <div className={styles.header}>
        <p className={styles.pHeading}>Quiz</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div> */}
      <div className={styles.box}>
        {levels.length > 0
          ? levels.map((quiz, index) => (
              <div key={index} className={quiz.level===1?styles.quiz1:styles.quiz} onClick={()=>clickHandler(quiz)}>
                <div className={styles.subbox1}>
                <img className={styles.icon} src={quiz.icon} />
                <div className={styles.subbox}>
                  <h4>LEVEL {quiz.level}</h4>
                  <p>{quiz.metadata.maxQuestions} Questions</p>
                </div>
                </div>
                {quiz.level === 1 ? (
                  <FaPlay className={styles.playicon} />
                ) : (
                  <AiFillLock className={styles.playicon} />
                )}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default QuizLevels;
