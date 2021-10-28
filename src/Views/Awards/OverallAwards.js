import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./OverallAwards.module.css";
import VoteIcon from "../../Icons/VoteIcon";
import PropTypes from "prop-types";

const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const OverallAwards = ({ awards, mode }) => {
  const history = useHistory();

  return (
    <div className={styles.list}>
      <div className={styles.container}>
        {awards.length > 0 ? (
          awards.map((award) => (
            <div style={{cursor:"pointer"}}  onClick={() => {
              history.push(
                `/awards/categories/${getSlug(award.title)}/${award._id}`
              );
            }} key={award._id} className={styles.poll}>
              <p className={styles.category}>{award.type[0]}</p>
              <div className={styles.main}>
                <div
                  className={styles.poll_image}
                  style={{
                    backgroundImage: `url("${award.icon}")`,
                  }}
                ></div>
                <div className={styles.poll_details}>
                  <p>{award.title}</p>
                </div>
                <div
                  className={styles.vote_now}
                 
                >
                  <div style={{ marginLeft: "8px" }}>
                    <VoteIcon />
                  </div>
                  <p>Vote Now</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no_polls_message">
            <p>More Awards coming very soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

OverallAwards.propTypes = {
  awards: PropTypes.array.isRequired,
};

export default OverallAwards;
