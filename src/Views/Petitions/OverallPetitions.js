import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./Petitions.module.css";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../api";
// import ProgressBar from "react-bootstrap/ProgressBar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const OverallPetitions = ({ petitions,page }) => {
  const history = useHistory();
  
    return petitions.length>0?petitions.slice(0,page*6).map((petition, index) => (
    <div
      key={index}
      onClick={() =>
        history.push(`/petition/${getSlug(petition.title)}/${petition._id}`)

    
      }
      className={styles.petition}
      
    >
      <div className={styles.petitionImg} style={{
        backgroundImage: `${OVERLAY}, url("${petition.image}")`,
      }}></div>
      <div className={styles.petition_container}>
        <p className={styles.petition_container_title}>{petition.title.slice(0, 30)}...</p>
        <p className={styles.petition_container_description}>{petition.description?petition.description.length>150?petition.description.substring(0,150)+"...":petition.description:""}</p>
        <div style={{margin:"20px 0"}}> 
        <ProgressBar bgcolor="#84855d" progress={((petition?petition.signaturesReceived:0)*100)/(petition?petition.expectedSignatures:0)}  height={30} />
{/* 
        <ProgressBar
            now={petition ? petition.signaturesReceived : 0}
            max={petition? petition.expectedSignatures : 0}
          /> */}
          <p className={styles.expected}>{petition ? petition.signaturesReceived : 0} signed of {petition? petition.expectedSignatures : 0} goal</p>
          </div>
      </div>
    </div>
  )):"";
};

OverallPetitions.propTypes = {
  petitions: PropTypes.array.isRequired,
}; 

export default OverallPetitions;
