import React, { useState, useEffect } from "react";
import styles from "./SingleNews.module.css";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

function SingleNews({ match }) {
    const history=useHistory();
  const { newsId } = match.params;
  const [newsData, setNewsData] = useState(null);


  const fetchNews = async () => {
    const { data } = await axios.get(`common/newsById/${newsId}`);
    setNewsData(data.payload);
  };

  useEffect(() => {
    fetchNews();
  }, [match]);

  useEffect(() => {
    const unlisten = history.listen(() => {
        window.scrollTo(-100, 0);
      });
      return () => {
        unlisten();
      };
  }, [])
  console.log(newsData);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.pHeading}>News</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.top}>
        <h4>{newsData ? newsData.categories[0] : ""}</h4>
        <hr />
        <p>
          {newsData
            ? "By " + newsData.user.firstName + " " + newsData.user.lastName
            : ""}
        </p>
      </div>
      <div className={styles.content}>
          <img className={styles.image} src={newsData?newsData.images[0]:""} />
          <h3 className={styles.title}>{newsData?newsData.headline:""}</h3>
          <div>
              <p className={styles.desc}>{newsData?newsData.description:""}</p>
          </div>
          <a className={styles.link} href={newsData?newsData.source:""}>Read Full Article</a>
      </div>
     
    </div>
  );
}

export default SingleNews;
