import React, { useState, useEffect } from "react";
import styles from "./IndividualPetition.module.css";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updatestatePhoto,
  updatestateProblem,
  updatestateRelink,
  updatestateTitle,
  updatestateDescription,
  updatestateExpectedSignatures,
  updatestateLifespan,
  updatestateCategory,
} from "../../redux/Actions";

import { isAuthenticated } from "../../api/index";

function PetitionPreview(props) {
  const token = JSON.parse(props.auth.token);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handlePrevClick = () => {
    history.push("/petition3");
  };

  const clickHandler = () => {
    if (
      !props.titlestate ||
      props.titlestate === "" ||
      !props.photostate ||
      !props.problemstate ||
      !props.expecteddignstate ||
      props.expectedSignatures === 0 ||
      props.lifespan === ""
    ) {
      toast(`please fill the required fields`);
      // setError("Please fill the required fields");
      // setTimeout(() => {
      //   setError(null);
      // }, 3000);
    } else {
      setError(null);
      createPost();
      props.updatestatePhoto(null);
      props.updatestateProblem(null);
      props.updatestateRelink("");
      history.push("/");
    }
  };

  const createPost = () => {
    const final = {
      image: props.photostate,
      title: props.titlestate,
      categories: props.categorystate,
      content: JSON.stringify(props.problemstate),
      expectedSignatures: props.expecteddignstate,
      description: props.descstate,
    };
    console.log(JSON.stringify(final));
    if (isAuthenticated()) {
      axios
        .post("petition", JSON.stringify(final), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Login Please");
    }
  };

  // useEffect(() => {
  //   if (props.problemstate != null && props.problemstate !== "undefined") {
  //     const contentState = convertFromRaw(props.problemstate);
  //     console.log(props.problemstate);
  //     const html = stateToHTML(contentState);
  //     const mySafeHTML = DOMPurify.sanitize(html);
  //     setData(mySafeHTML);
  //   }
  // }, []);
  console.log(data);

  return (
    <>
    <div className={styles.container}>
    <ToastContainer/>
      <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.title}>
        {props.titlestate}
      </div>
      <div className={styles.main}>
        <div>
          <img
            className={styles.pic}
            src={props.photostate}
          ></img>
          <p className={styles.imgtext}>
  
           {props.problemstate && <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(props.problemstate)) }} />}

            {/* {petitionData ? petitionData.description : ""} */}
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.one}>
           {props.expecteddignstate} Signatures Expected
          </p>
          {/* <ProgressBar
            now={petitionData ? petitionData.signaturesReceived : 0}
            max={petitionData ? petitionData.expectedSignature : 0}
          /> */}
           {/* <ProgressBar bgcolor="#84855d" progress={((petitionData?petitionData.signaturesReceived:0)*100)/(petitionData?petitionData.expectedSignature:0)}  height={15} /> */}
          <p className={styles.sig}>
            <i
              className="fas fa-check-circle"
              style={{
                color: "#84855d",
                marginRight: "0",
                fontSize: "20px",
              }}
            ></i>
            <span className={styles.two1}>
              <span className={styles.two}>
                At {props.expecteddignstate}{" "}
                signatures,
              </span>
              this petition is more likely to get a reaction from the decision
              maker!
            </span>
          </p>
          <div className={styles.actions}>
        <button className={styles.backbtn} onClick={handlePrevClick}>
          Previous
        </button>
        <button className={styles.backbtn} onClick={clickHandler}>
          {" "}
          Save and post{" "}
        </button>
      </div>
        </div>
      </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    photostate: state.pet.photo,
    problemstate: state.pet.problem,
    reflinkstate: state.pet.reflink,
    titlestate: state.pet.title,
    categorystate: state.pet.category,
    descstate: state.pet.desc,
    expecteddignstate: state.pet.expectedSignatures,
    lifespanstate: state.pet.lifespan,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatestatePhoto: (photo) => dispatch(updatestatePhoto(photo)),
    updatestateProblem: (problem) => dispatch(updatestateProblem(problem)),
    updatestateRelink: (reflink) => dispatch(updatestateRelink(reflink)),
    updatestateTitle: (title) => dispatch(updatestateTitle(title)),
    updatestateDesc: (desc) => dispatch(updatestateDescription(desc)),
    updatestateExpectedSign: (sign) =>
      dispatch(updatestateExpectedSignatures(sign)),
    updatestateLifespan: (span) => dispatch(updatestateLifespan(span)),
    updatestateCategory: (category) => dispatch(updatestateCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PetitionPreview);
