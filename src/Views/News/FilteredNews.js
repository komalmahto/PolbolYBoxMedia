import { useHistory } from "react-router";
import { getSlug } from "../../helpers";
import styles from "./FilteredNews.module.css";
import PropTypes from "prop-types";

const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const FilteredNews = ({ news,page }) => {
  const history = useHistory();

  return news.slice(0,page*12).map((singlenews, index) => (
    <div
      key={index}
      onClick={() =>
        history.push(
          `/news/${getSlug(singlenews.short_headline)}/${singlenews._id}`
        )
      }
      className={styles.filtered}
    >
        <div className={styles.image}  style={{
        backgroundImage: `${OVERLAY}, url("${singlenews.images[0]}")`,
      }}></div>
      <div className={styles.poll_container}>
        <p className={styles.head}>{singlenews.short_headline}</p>
        <p className={styles.disc}>{singlenews.description.length<350?singlenews.description:`${singlenews.description.slice(0,350)}...`}</p>
      </div>
    </div>
  ));
};

FilteredNews.propTypes = {
  news: PropTypes.array.isRequired,
};

export default FilteredNews;
