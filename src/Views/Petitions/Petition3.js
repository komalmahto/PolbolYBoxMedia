import React, { useState, useEffect } from "react";
import styles from "./Petition.module.css";
import { useHistory } from "react-router-dom";
import { GiHorizontalFlip } from "react-icons/gi";
import "./Editor.css";
import { connect } from "react-redux";
import { updatestatePhoto } from "../../redux/Actions";
import axios from "../../axios";
import {isAuthenticated} from "../../api/index"
function Petition3(props) {
  const token=JSON.parse(props.auth.token);
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
      props.updatestatePhoto(photo);
    } else {
      props.updatestatePhoto(url);
    }
    history.push('/petition-preview')
  };
  
  const handleImage = (e) => {
    if (e.target.files[0].type.split("/")[0] === "image") {
      setSource(URL.createObjectURL(e.target.files[0]));
      setError(null);
     let formData=new FormData();
     formData.append("image",e.target.files[0]);
      axios.post(`upload/image`,
      formData,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,
                  'Authorization':`bearer ${token}`
                }
      }).then((res)=>{
        console.log(res);
        setPhoto(res.data.payload)
      })
      .catch((err)=>console.log(err))
    } 
    else {
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
        <form className={styles.fileinput}>
        <div className="form-group">
          <input
            onChange={(e) => handleImage(e)}
            type="file"
            accept="image/*"
            className="form-control"
          />
          </div>
          </form>
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
    auth:state.auth,
    photostate: state.pet.photo,
    problemstate: state.pet.problem,
    reflinkstate: state.pet.reflink,
    titlestate: state.pet.title,
    categorystate: state.pet.category,
    descstate: state.pet.description,
    expecteddignstate: state.pet.expectedSignatures,
    lifespanstate: state.pet.lifespan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatestatePhoto: (photo) => dispatch(updatestatePhoto(photo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Petition3);
