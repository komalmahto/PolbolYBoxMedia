import React, { useState, useEffect } from "react";
import styles from "./FilteredPolls/FilteredPolls.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import pic from "../../Icons/pie_chart.png";
import { getSlug } from "../../helpers";
import { useHistory } from "react-router";
import * as api from "../../api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";

function NewPol({ data, pollId, lang }) {
  const history = useHistory();
  const [pollData, setPollData] = useState(null);
  const [comments, setComments] = useState([]);
  const [allActive, setAllActive] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    handleFetch();
    handleComments();
    console.log(history);
  }, [history.location]);
  useEffect(() => {
    getActivePolls();
  }, [lang]);
  const getActivePolls = async () => {
    try {
      const { data } = await api.getExpiredPolls(lang);
      setAllActive(data.payload.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetch = () => {
    fetch(`https://backend.polbol.in/backend/poll/${pollId}`)
      .then((res) => res.json())
      .then((data) => setPollData(data.payload));
  };
  const handleComments = () => {
    fetch(
      `https://backend.polbol.in/backend/common/polls/comments?poll=${pollId}`
    )
      .then((res) => res.json())
      .then((data) => setComments(data.payload.data));
  };

  const clickHandler = () => {
    history.push(
      `/poll/results/graphs/${getSlug(pollData.question)}/${pollData._id}`
    );
  };

  console.log(pollData);
  return (
    <div className={styles.poll}>
      <div className={styles.carousel}>
        <Carousel
          infinite={true}
          itemClass={styles.grid}
          responsive={responsive}
        >
          {allActive.length > 0 &&
            allActive
              .filter((fil) => fil._id !== pollId)
              .map((pol) => (
                <div className={styles.carouselCard}>
                  <div
                    className={styles.carouselImage}
                    style={{ backgroundImage: `url(${pol.image})` }}
                  ></div>
                  <div className={styles.carouselText}>
                    {lang.language === "Hindi"
                      ? pol.question_hindi
                      : pol.question}
                    <center>
                      <span
                        onClick={() =>
                          history.push(
                            `/poll/results/${getSlug(
                              lang.language === "Hindi"
                                ? pol.question_hindi
                                : pol.question
                            )}/${pol._id}`
                          )
                        }
                        className={styles.voteBtn}
                      >
                        View Result
                      </span>
                    </center>
                  </div>
                </div>
              ))}
        </Carousel>
      </div>

      <p className={styles.category}>
        Poll on {pollData ? pollData.categories[0] : ""}
      </p>
      <div className={styles.main}>
        <div
          className={styles.poll_image}
          style={{
            backgroundImage: `url("${pollData ? pollData.image : ""}")`,
          }}
        ></div>
        <div className={styles.poll_details}>
          <p>{pollData ? pollData.question : ""}</p>
          <div className={styles.actions}>
            <div className={styles.like}>
              <i className="far fa-heart"></i>{" "}
              {pollData ? pollData.likesCount : ""}
            </div>
          </div>
        </div>
        <div className={styles.resBtn} onClick={clickHandler}>
          <img
            className={styles.chart_image}
            src="https://api.iconify.design/flat-color-icons/pie-chart.svg"
          />
          <p>View Results</p>
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
  );
}

const mapStateToProps = (state) => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(NewPol);
