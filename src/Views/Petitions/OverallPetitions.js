import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./Petitions.module.css";
import PropTypes from "prop-types";

const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const OverallPetitions = ({ petitions }) => {
  const history = useHistory();
  
    return petitions.length>0?petitions.map((petition, index) => (
    <div
      key={index}
      onClick={() =>
        history.push(`/petition/${getSlug(petition.question)}/${petition._id}`)
      }
      className={styles.petition}
      style={{
        backgroundImage: `${OVERLAY}, url("${petition.image}")`,
      }}
    >
      {/* <div className={styles.poll_container}>
        <p>{petition.question.slice(0, 30)}...</p>
      </div> */}
    </div>
  )):"";
};

OverallPetitions.propTypes = {
  petitions: PropTypes.array.isRequired,
}; 

export default OverallPetitions;
