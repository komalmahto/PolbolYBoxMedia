import React, { useState, useEffect } from "react";
import styles from "./Petition.module.css";
import { useHistory } from "react-router-dom";
import { GiHorizontalFlip } from "react-icons/gi";
import { connect } from "react-redux";
import { updatestateTitle } from "../../redux/Actions";

function Petition1(props) {
  const history = useHistory();

  const [title, setTitle] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleClick = () => {
    props.updatestateTitle(title);
    console.log("hello");
    history.push("/petition2");
  };
  const handlePrevClick = () => {
    history.push("/petition");
  };

  useEffect(() => {
    setTitle(props.titlestate);
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

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
        <div className={styles.circle}>
          <p className={styles.text}>1</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={`${styles.circle} ${styles.active}`}>
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
        <p className={styles.ques}>Write your petition title</p>
        <p className={styles.qtext}>
          This is the first thing people will see about your petition. Get their
          attention with a short title that focusses on the change you’d like
          them to support.
        </p>
      </div>

      <input
        className={styles.tbox}
        placeholder="Title"
        value={title}
        onChange={handleTitle}
      ></input>
      <button className={styles.backbtn} onClick={handlePrevClick}>
        Previous
      </button>
      <button className={styles.btn} onClick={handleClick}>
        Continue
      </button>
      <div className={styles.desc}>
        <p className={styles.head}>Keep it short and to the point</p>
        <p className={styles.sub}>
          Example: "Buy organic, free-range eggs for your restaurants"
        </p>
        <p className={styles.head}>Keep it short and to the point</p>
        <p className={styles.sub}>
          Example: "Buy organic, free-range eggs for your restaurants"
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    titlestate: state.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatestateTitle: (title) => dispatch(updatestateTitle(title)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Petition1);
