import React, { useState, useEffect } from "react";
import styles from "./SingleNews.module.css";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListGroup from "react-bootstrap/ListGroup";

function SingleNews({ match }) {
  const history = useHistory();
  const { newsId } = match.params;
  const [newsData, setNewsData] = useState(null);
  const [comments,setComments]=useState([])

  const fetchNews = async () => {
    const { data } = await axios.get(`common/newsById/${newsId}`);
    setNewsData(data.payload);
  };

  useEffect(() => {
    fetchNews();
    handleComments()
  }, [match]);
  const handleComments = () => {
    fetch(
      `https://backend.polbol.in/backend/common/comments?parentId=${newsId}&parentType=news`
    )
      .then((res) => res.json())
      .then((data) => setComments(data.payload.data));
  };
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(-100, 0);
    });
    return () => {
      unlisten();
    };
  }, []);
  console.log(newsData);
  const notify = () => {
    navigator.clipboard.writeText(window.location.href)
    toast("Copied to clipboard");
  };

  return (
    <>
      <ToastContainer />

      <div className={styles.container1}>

      <div className={styles.header}>
        <p className={styles.pHeading}>News</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.center}>
        <div className={styles.container}>
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
            <img
              className={styles.image}
              src={newsData ? newsData.images[0] : ""}
            />
            <div className={styles.sub}>
            <h3 className={styles.title}>
              {newsData ? newsData.headline : ""}
            </h3>
            <div>
              <p className={styles.desc}>
                {newsData ? newsData.description : ""}
              </p>
            </div>
            <a className={styles.link} href={newsData ? newsData.source : ""}>
              Read Full Article
            </a>
            <div className={styles.like}>
              <div>
                <span>
                  <i className="fas fa-heart"></i>{" "}
                  {newsData ? newsData.likesCount : ""}
                </span>
                <span>
                  <i className="far fa-comments"></i>
                  {newsData ? newsData.commentCount : ""}
                </span>
              </div>
              <div>
                <span onClick={notify}>
                  <i className="fas fa-share-alt"></i>
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.comments}>
        <p>{comments.length} Comments</p>
        <ListGroup>
          {comments.length > 0
            ? comments.map((item, index) => {
                return (
                  <ListGroup.Item
                    key={index}
                    className={styles.commentcontainer}
                  >
                    <img className={styles.avatar} src={item.user.avatar} />
                    <div>
                      <p className={styles.categoryUser}>
                        @{item.user.userName}
                      </p>
                      <p className={styles.category}>{item.comment}</p>
                    </div>
                  </ListGroup.Item>
                );
              })
            : ""}
        </ListGroup>
      </div>

      </div>
     
    </>
  );
}

export default SingleNews;
