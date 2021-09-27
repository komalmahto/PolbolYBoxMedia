import React, { useState, useEffect } from "react";
import styles from "./Petition.module.css";
import { useHistory } from "react-router-dom";
import { GiHorizontalFlip } from "react-icons/gi";
import "./Editor.css";
import { connect } from "react-redux";
import { updatestatePhoto } from "../../redux/Actions";

function Petition3(props) {
  const history = useHistory();
  const [url, setUrl] = useState("");
  const [photo, setPhoto] = useState(null);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(false);

  const handlePrevClick = () => {
    history.push("/petition2");
  };

  const handleSave = () => {
    if (photo != null) {
      props.updatestatePhoto({ photo });
    } else {
      props.updatestatePhoto(url);
    }
  };

  const handleImage = (e) => {
    if (e.target.files[0].type.split("/")[0] === "image") {
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setSource(URL.createObjectURL(e.target.files[0]));
      setError(null);
    } else {
      setError(true);
      setTimeout(() => {
        setError(null);
      }, 4000);
      setPhoto(null);
      setSource(null);
    }
    e.target.value = "";
  };

  useEffect(() => {
    setPhoto(props.photostate);
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
        <div className={styles.circle}>
          <p className={styles.text}>2</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>3</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={`${styles.circle} ${styles.active}`}>
          <p className={styles.text}>4</p>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.ques}>Add a photo</p>
        <p className={styles.qtext}>
          Petitions with a photo or video receive six times more signatures than
          those without. Include one that captures the emotion of your story.
        </p>
      </div>
      <div className={styles.area}>
        <div className={styles.picarea}>
          {source ? <img className={styles.pic} src={source} /> : ""}
        </div>
        <input
          className={styles.fileinput}
          type="file"
          accept="image/*"
          onChange={handleImage}
        />
        {error ? <p className={styles.error}>Upload only images </p> : ""}
      </div>

      <p className={styles.message} style={{ textAlign: "center" }}>
        Or Provide URL Here
      </p>
      <input
        className={styles.tbox}
        placeholder="https://"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button className={styles.add}>Add</button>
      <button className={styles.backbtn} onClick={handlePrevClick}>
        Previous
      </button>
      <button onClick={handleSave} className={styles.btn}>
        Save and Preview
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
    photostate: state.photo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatestatePhoto: (photo) => dispatch(updatestatePhoto(photo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Petition3);
