import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./Polls.module.css";
import PropTypes from "prop-types";

const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const OverallPolls = ({ polls ,mode,page}) => {
  const history = useHistory();

  return polls.slice(0,page*3).map((poll, index) => (
    <div
      key={index}
      onClick={() =>{
        mode==='active'?
        history.push(`/poll/${getSlug(poll.question)}/${poll._id}`)
        : history.push(`/poll/results/${getSlug(poll.question)}/${poll._id}`)
      }
      }
      className={styles.poll}
      style={{
        backgroundImage: `${OVERLAY}, url("${poll.image}")`,
      }}
    >
      <div className={styles.poll_container}>
        <p>{poll.question.slice(0, 30)}...</p>
      </div>
    </div>
  ));
};

OverallPolls.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default OverallPolls;
