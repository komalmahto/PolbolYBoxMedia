import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
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
      <div className={styles.header}>
        <p className={styles.pHeading}>Quiz</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.headCat}>
        <h3> Choose quiz category</h3>
        {/* <hr className={styles.hr} /> */}
      </div>
      <div className={styles.cards1}>
        {categories.length > 0
          ? categories.map((category, index) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => handleClick(category._id)}
              >
                        <div className={styles.cardinside}>

                <img className={styles.image1} src={category.icon} />
                </div>
                <p className={styles.name}>{category.name}</p>

              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default QuizCat;
