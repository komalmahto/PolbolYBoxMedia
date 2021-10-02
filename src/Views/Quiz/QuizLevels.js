import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Quiz.css";
import { FaPlay } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

function QuizLevels({ match }) {
  const { catId } = match.params;
  const [levels, setLevels] = useState([]);

  const fetchQuiz = async () => {
    const { data } = await axios.get(
      `quiz/fetchQuiz/guest?categoryId=${catId}`
    );
    setLevels(data.payload.quizzes);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  console.log(levels);
  return (
    <div>
      <div className="header">
        <p className="pHeading">Quiz</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="box">
        {levels.length > 0
          ? levels.map((quiz, index) => (
              <div key={index} className="quiz">
                <img className="icon" src={quiz.icon} />
                <div className="sub-box">
                  <h4>LEVEL {quiz.level}</h4>
                  <p>{quiz.metadata.maxQuestions} Questions</p>
                </div>
                {quiz.level == 1 ? (
                  <FaPlay className="playicon" />
                ) : (
                  <AiFillLock className="playicon" />
                )}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default QuizLevels;
