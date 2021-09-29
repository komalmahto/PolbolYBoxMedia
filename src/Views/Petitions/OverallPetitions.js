import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./Petitions.module.css";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../api";

const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const OverallPetitions = ({ petitions }) => {
  const history = useHistory();
  
    return petitions.length>0?petitions.map((petition, index) => (
    <div
      key={index}
      onClick={() =>
        (isAuthenticated())?
        history.push(`/petition/${getSlug(petition.title)}/${petition._id}`)
        :
          history.push(`common/petition/${getSlug(petition.title)}/613c4f54a781e21a7cf0cdbb`)
    
      }
      className={styles.petition}
      style={{
        backgroundImage: `${OVERLAY}, url("${petition.image}")`,
      }}
    >
      <div className={styles.petition_container}>
        <p>{petition.title.slice(0, 30)}...</p>
      </div>
    </div>
  )):"";
};

OverallPetitions.propTypes = {
  petitions: PropTypes.array.isRequired,
}; 

export default OverallPetitions;
