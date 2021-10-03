import React, { useState, useEffect } from "react";
import "./Quiz.css";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
function QuizCat() {
  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const { data } = await axios.get("quiz/fetchAllCategories");
    setCategories(data.payload);
  };
  const handleClick = (id) => {
    history.push(`/quiz/levels/${id}`);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="header">
        <p className="pHeading">Quiz</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="head">
        <h3> Choose quiz category</h3>
        <hr className="hr" />
      </div>
      <div className="card1s">
        {categories.length > 0
          ? categories.map((category, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleClick(category._id)}
              >
                <img className="image1" src={category.icon} />
                <p className="name">{category.name}</p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default QuizCat;
