// import VoteIcon from "../../../Icons/VoteIcon";
import styles from "../Petitions.module.css";
import { useHistory } from "react-router";
import { getSlug } from "../../../helpers/index";
import { expiresIn, formatDate } from "../../../helpers";
import PropTypes from "prop-types";
const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const FilteredPetitions = ({ mode, petitions,page }) => {
  const history = useHistory();

  return (
    <div className={styles.list}>
      <div className={styles.container}>
        {petitions.length > 0 ? (
          petitions.slice(0,page*6).map((petition,index) => (
            <div
            key={index}
            onClick={() =>
              history.push(`/petition/${getSlug(petition.title)}/${petition._id}`)
      
          
            }
            className={styles.petition}
            
          >
            <div className={styles.petitionSub}>
            <div className={styles.petitionImg} style={{
              backgroundImage: `${OVERLAY}, url("${petition.image}")`,
            }}></div>
            <div className={styles.petition_container}>
              <p className={styles.petition_container_title}>{petition.title.slice(0, 30)}...</p>
              <p className={styles.petition_container_description}>{petition.description?petition.description.length>150?petition.description.substring(0,150)+"...":petition.description:""}</p>
              {/* <div style={{margin:"20px 0"}}> 
              <ProgressBar bgcolor="#84855d" progress={((petition?petition.signaturesReceived:0)*100)/(petition?petition.expectedSignatures:0)}  height={10} />
      
                <p className={styles.expected}>{petition ? petition.signaturesReceived : 0} signed of {petition? petition.expectedSignatures : 0} goal</p>
                </div> */}
            </div>
            </div>
            <div className={styles.petitionBtm}>
              <span className={styles.user}>{petition&&petition.user.userName}</span>
              <span className={styles.supp}><i className="fas fa-users"></i><span className={styles.num}> {petition?petition.signaturesReceived:0}</span> {" "}supporters</span>
      
            </div>
          </div>
          ))
        ) : (
          <div className={styles.no_polls_message}>
            <p>More petitions coming very soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

FilteredPetitions.propTypes = {
  petitions: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
};

export default FilteredPetitions;
