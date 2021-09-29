import React from "react";
import styles from "./IndividualPetition.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CgCheckO } from "react-icons/cg";
import { AiOutlineUser} from "react-icons/ai";
import { BiCheckSquare} from "react-icons/bi";
import pic from "./bridge-53769_1280.jpg"
function IndividualPetition() {
  return (
    <div className="area">
      <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.title} >Lorem Ipsum is simply dummy text of the printing</div>
      <div className={styles.main}>
      <div className={styles.box}>
        <p className={styles.one}>5,911 have signed. Let’s get to 7,500!</p>
        <ProgressBar  now={60} />
        <CgCheckO /><p ><span className={styles.two}>At 7,500 signatures,</span><span> this petition is more likely to get a reaction from the decision maker!</span></p>
        <AiOutlineUser/><p ><span className={styles.three}>Manveer </span> signed 55 minutes ago</p>
        <AiOutlineUser/><p ><span className={styles.three}>Manveer Dodani</span> signed 55 minutes ago</p>
        <AiOutlineUser/>  <p><span className={styles.three}>Kartik Kumawat </span>  Singapore</p>
        <textarea placeholder="I am signing because  (optional)"/>
        <br/>
        <BiCheckSquare /><p>Display my name and comment on this petition</p>
        <button className={styles.btn}>Sign In This Petition</button>
      </div>
      <img  className={styles.pic} src={pic}></img>
      <p className={styles.imgtext}>
        Jimmy Tan started this petition to Housing and Development Board (HDB)
        (CEO Mr Tan Meng Dui) and{" "}
      </p>
      <div className={styles.text}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
      </div>
    </div>
    </div>  
  );
}

export default IndividualPetition;
