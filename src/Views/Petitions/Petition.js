import React, { useState, useEffect } from "react";
import styles from "./Petition.module.css";
import { useHistory } from "react-router-dom";
import { GiHorizontalFlip } from "react-icons/gi";
function Petition() {
  const history = useHistory();
  const [category, setCategory] = useState(null);

  const categories = [
    "Animals",
    "Animals",
    "Animals",
    "Animals",
    "Animals",
    "Animals",
    "Animals",
    "Animals",
  ];

  const handleSelect = (e) => {
    setCategory(e.target.id);
  };
  const handleClick = () => {
    history.push("/petition1");
  };
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);
  return (
    <div>
      <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.steps}>
        <div className={`${styles.circle} ${styles.active}`}>
          <p className={styles.text}>1</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>2</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>3</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>4</p>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.ques}>
          What kind of issue are you petitioning on?
        </p>
        <p className={styles.qtext}>
          Selecting a topic allows Change.org to recommend your petition to
          interested supporters.
        </p>
      </div>

      <div className={styles.cards}>
        {categories.map((value, key) => (
          <div key={key} id={value} className={styles.card}>
            <div
              id={value}
              onClick={handleSelect}
              className={styles.tile}
            ></div>
            <p id={value} onClick={handleSelect}>
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.box}>See More</div>
      <button className={styles.btn} onClick={handleClick}>
        Continue
      </button>
    </div>
  );
}

export default Petition;