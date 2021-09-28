// import VoteIcon from "../../../Icons/VoteIcon";
import styles from "./FilteredPetitions.module.css";
import { useHistory } from "react-router";
import { expiresIn, formatDate } from "../../../helpers";
import PropTypes from "prop-types";

const FilteredPetitions = ({ mode, petitions }) => {
  const history = useHistory();

  return (
    <div className={styles.list}>
      <div className={styles.container}>
        {petitions.length > 0 ? (
          petitions.map((petition) => (
            <div key={petition._id} className={styles.petition}>
              <p className={styles.category}>Petition on {petition.categories[0]}</p>
              <div className={styles.main}>
                <div
                  className={styles.poll_image}
                  style={{
                    backgroundImage: `url("${petition.image}")`,
                  }}
                ></div>
                <div className={styles.poll_details}>
                  <p>{petition.question}</p>
                  <div className={styles.actions}>
                    <div className={styles.like}>
                      <i className="far fa-heart"></i> {petition.likesCount}
                    </div>
                    <div className={styles.comment}>
                      <i className="far fa-comments"></i> {petition.commentCount}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.vote_now}
                  onClick={() =>
                    history.push(
                      `/petition/${petition.question.split(" ").join("-")}/${petition._id}`
                    )
                  }
                >
                  <p>{mode === "active" ? "Vote Now" : "View Results"}</p>
                </div>
                <p className={styles.expiry}>
                  {mode === "active"
                    ? `Expiring in ${expiresIn(petition.lifeSpan)} Days`
                    : `Expired on ${formatDate(petition.lifeSpan)}`}
                </p>
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
