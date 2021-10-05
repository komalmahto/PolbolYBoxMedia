import React, { useState, useEffect } from "react";
import styles from "./FilteredPolls/FilteredPolls.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import pic from "../../Icons/pie_chart.png";
import { getSlug } from "../../helpers";
import { useHistory } from "react-router";

function NewPol({ data, pollId }) {
  const history = useHistory();
  const [pollData, setPollData] = useState(null);
  const [comments, setComments] = useState([]);
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

  const clickHandler=()=>{
    history.push(`/poll/results/graphs/${getSlug(pollData.question)}/${pollData._id}`)
  }
  useEffect(() => {
    handleFetch();
    handleComments();
  }, []);

  console.log(pollData);
  return (
    <div className={styles.poll}>
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
        <div>
          <img className={styles.chart_image} onClick={clickHandler} src={pic} />
        </div>
      </div>
      <div className={styles.comments}>
        Comments
        <ListGroup>
          {comments.length > 0
            ? comments.map((item, index) => {
                return (
                  <ListGroup.Item key={index} className={styles.commentcontainer}>
                    <img className={styles.avatar}  src={item.user.avatar} />
                    <p className={styles.name}>@{item.user.userName} commented</p>
                    <p className={styles.comments}>{item.comment}</p>
                  </ListGroup.Item>
                );
              })
            : ""}
        </ListGroup>
      </div>
    </div>
  );
}

export default NewPol;
