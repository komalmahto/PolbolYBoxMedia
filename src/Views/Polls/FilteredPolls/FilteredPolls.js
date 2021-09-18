import VoteIcon from "../../../Icons/VoteIcon";
import styles from "./FilteredPolls.module.css";
import { useHistory } from "react-router";
import { expiresIn, formatDate } from "../../../helpers";
import PropTypes from "prop-types";

const FilteredPolls = ({ mode, polls }) => {
  const history = useHistory();

  return (
    <div className={styles.list}>
      <div className={styles.container}>
        {polls.length > 0 ? (
          polls.map((poll) => (
            <div key={poll._id} className={styles.poll}>
              <p className={styles.category}>Poll on {poll.categories[0]}</p>
              <div className={styles.main}>
                <div
                  className={styles.poll_image}
                  style={{
                    backgroundImage: `url("${poll.image}")`,
                  }}
                ></div>
                <div className={styles.poll_details}>
                  <p>{poll.question}</p>
                  <div className={styles.actions}>
                    <div className={styles.like}>
                      <i className="far fa-heart"></i> {poll.likesCount}
                    </div>
                    <div className={styles.comment}>
                      <i className="far fa-comments"></i> {poll.commentCount}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.vote_now}
                  onClick={() =>
                    history.push(
                      `/poll/${poll.question.split(" ").join("-")}/${poll._id}`
                    )
                  }
                >
                  <div style={{ marginLeft: "8px" }}>
                    <VoteIcon />
                  </div>
                  <p>{mode === "active" ? "Vote Now" : "View Results"}</p>
                </div>
                <p className={styles.expiry}>
                  {mode === "active"
                    ? `Expiring in ${expiresIn(poll.lifeSpan)} Days`
                    : `Expired on ${formatDate(poll.lifeSpan)}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.no_polls_message}>
            <p>More polls coming very soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

FilteredPolls.propTypes = {
  polls: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
};

export default FilteredPolls;
