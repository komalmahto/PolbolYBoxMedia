import React from "react";
import styles from "./IndividualPetition.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CgCheckO } from "react-icons/cg";
import { AiOutlineUser} from "react-icons/ai";
import { BiCheckSquare} from "react-icons/bi";

function IndividualPetition() {
  return (
    <div>
      <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div>Lorem Ipsum is simply dummy text of the printing</div>
      <img src=""></img>
      <p>
        Jimmy Tan started this petition to Housing and Development Board (HDB)
        (CEO Mr Tan Meng Dui) and{" "}
      </p>

      <div>
        <p>5,911 have signed. Let’s get to 7,500!</p>
        <ProgressBar now={60} />
        <CgCheckO /><p>At 7,500 signatures, this petition is more likely to get a reaction from the decision maker!</p>
        <AiOutlineUser/><p>Manveer Dodani signed 55 minutes ago</p>
        <AiOutlineUser/><p>Manveer Dodani signed 55 minutes ago</p>
        <AiOutlineUser/>  <p>Kartik Kumawat   Singapore</p>
        <textarea placeholder="I am signing because  (optional)"/>
        <BiCheckSquare /><p>Display my name and comment on this petition</p>
        <button>Sign In This Petition</button>
      </div>
    </div>  
  );
}

export default IndividualPetition;
