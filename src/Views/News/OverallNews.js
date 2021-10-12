import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./News.module.css";
import PropTypes from "prop-types";

const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const OverallNews = ({ news,page }) => {
  const history = useHistory();

  return news.slice(0,page*12).map((singlenews, index) => (
    <div
      key={index}
      onClick={() =>
        history.push(
          `/news/${getSlug(singlenews.short_headline)}/${singlenews._id}`
        )
      }
      className={styles.poll}
      style={{
        backgroundImage: `${OVERLAY}, url("${singlenews.images[0]}")`,
      }}
    >
      <div className={styles.poll_container}>
        <p>{singlenews.short_headline}</p>
      </div>
    </div>
  ));
};

OverallNews.propTypes = {
  news: PropTypes.array.isRequired,
};

export default OverallNews;
