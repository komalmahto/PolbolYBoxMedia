import React, { useState, useEffect } from "react";
import styles from "./IndividualPetition.module.css";
// import ProgressBar from "react-bootstrap/ProgressBar";
import * as api from "../../api/index";
// import { CgCheckO } from "react-icons/cg";
// import { AiOutlineUser } from "react-icons/ai";
// import { BiCheckSquare } from "react-icons/bi";
// import pic from "./bridge-53769_1280.jpg";
// import { stateToHTML } from "draft-js-export-html";
import { connect } from "react-redux";
// import { convertFromRaw } from "draft-js";
// import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
// import { convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import { stateToHTML } from "draft-js-export-html";
import { convertToRaw, convertFromRaw, EditorState, Editor } from 'draft-js';

function IndividualPetition({ match, auth }) {
  const { petitionId } = match.params;

  const history = useHistory();

  const [petitionData, setPetitionData] = useState(null);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState("");
  const [identity, setIdentity] = useState(false);

  useEffect(() => {
    fetchData();
  }, [match]);

  useEffect(() => {
    // if(petitionData!=null){
    // const contentState = convertFromRaw(petitionData.content);
    // const html=stateToHTML(contentState);
    // const mySafeHTML = DOMPurify.sanitize(html);
    // setData(mySafeHTML);
  }, [petitionData]);

  const fetchData = async () => {
    let data;
    try {
      if (api.isAuthenticated()) {
        data = await axios.get(`petition/${petitionId}`, {
          headers: {
            Authorization: `bearer ${JSON.parse(auth.token)}`,
          },
        });
      } else {
        data = await axios.get(`common/petition/${petitionId}`);
      }
      setPetitionData(data.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const signPetitionHandler = async () => {
    if (api.isAuthenticated()) {
      const final = {
        petition: petitionId,
        comment: comments,
        anonymous: identity,
      };
      await axios.post("petition/signature", JSON.stringify(final), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${JSON.parse(auth.token)}`,
        },
      });

toast("Petition signed!!!")   
setTimeout(()=>{
  window.location.reload();

},1000)

 }
  };
  const identityHandler = (e) => {
    setIdentity(e.target.checked);
  };

  const handletextChange = (e) => {
    setComments(e.target.value);
  };

  const notify=()=>{
    navigator.clipboard.writeText(window.location.href)
    toast("Copied to clipboard");
  }

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
        {petitionData
          ? petitionData.title
          : ""}
      </div>
      <div className={styles.main}>
        <div>
          <img
            className={styles.pic}
            src={petitionData ? petitionData.image : ""}
          ></img>
          <p className={styles.imgtext}>
            
            {/* {petitionData&&stateToHTML(convertFromRaw(JSON.parse(petitionData.content)))} */}
            {petitionData&&console.log(stateToHTML(convertFromRaw(JSON.parse(petitionData.content))))}
            <div dangerouslySetInnerHTML={{ __html: petitionData&&stateToHTML(convertFromRaw(JSON.parse(petitionData.content))) }} />

            {/* {petitionData ? petitionData.description : ""} */}
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.one}>
            {petitionData ? petitionData.signaturesReceived : ""} have signed.
            Let’s get to {petitionData ? petitionData.expectedSignature : ""}!
          </p>
          {/* <ProgressBar
            now={petitionData ? petitionData.signaturesReceived : 0}
            max={petitionData ? petitionData.expectedSignature : 0}
          /> */}
           <ProgressBar bgcolor="#84855d" progress={((petitionData?petitionData.signaturesReceived:0)*100)/(petitionData?petitionData.expectedSignature:0)}  height={15} />
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
                At {petitionData ? petitionData.expectedSignature : ""}{" "}
                signatures,
              </span>
              this petition is more likely to get a reaction from the decision
              maker!
            </span>
          </p>
          {/* <AiOutlineUser/><p ><span className={styles.three}>Manveer </span> signed 55 minutes ago</p>
        <AiOutlineUser/><p ><span className={styles.three}>Manveer Dodani</span> signed 55 minutes ago</p> */}
          {/* <AiOutlineUser/>  <p><span className={styles.three}>Kartik Kumawat </span>  Singapore</p> */}
          <textarea
            onChange={handletextChange}
            value={comments}
            placeholder="I am signing because  (optional)"
          />
          <label className={styles.agree} htmlFor="">
            <input
              type="checkbox"
              onChange={identityHandler}
              checked={identity}
            />
            Display my name and comment on this petition
          </label>
          {auth.token && petitionData&&!petitionData.signedByMe?<button onClick={signPetitionHandler} className={styles.btn}>
            Sign In This Petition
          </button>:auth.token &&<button  className={styles.btn}>
            Signature Received
          </button>}
          {!auth.token&&<button onClick={()=>toast("Login to sign petition!!")}  className={styles.btn}>
            Sign In This Petition
          </button>}
          <span style={{marginLeft:"10rem",cursor:"pointer",color:"#84855d"}} onClick={notify}><i className="fas fa-share-alt"></i></span>
        </div>
      </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(IndividualPetition);
