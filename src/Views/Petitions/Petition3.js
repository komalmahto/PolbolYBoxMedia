import React, { useState,useEffect } from "react";
import styles from "./Petition.module.css";
import { useHistory } from "react-router-dom";
import { GiHorizontalFlip } from "react-icons/gi";
import "./Editor.css";

function Petition3() {
const history=useHistory();
  const [url, setUrl] = useState("");
  
  useEffect(() => {
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
        <p className={styles.ques}>Add a photo or video</p>
        <p className={styles.qtext}>
        Petitions with a photo or video receive six times more signatures than those without. Include one that captures the emotion of your story.
        </p>
      </div>
      <div className={styles.area}>
      <input className={styles.fileinput} type="file" id="img" name="img" accept="image/*,video/*" />
      </div>

      <p className={styles.message} style={{textAlign:"center"}}>
      Or Provide URL Here
      </p>
      <input
        className={styles.tbox}
        placeholder="https://"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button className={styles.add}>Add</button>
      <button className={styles.btn}>Save and Preview</button>
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

export default Petition3;
