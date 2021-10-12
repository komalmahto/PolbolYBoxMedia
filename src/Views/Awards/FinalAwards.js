import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { isAuthenticated } from "../../api/index";
import { getSlug } from "../../helpers";
import { useHistory } from "react-router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

import styles from "./AwardCategories.module.css";

function FinalAwards({ match }) {
  const history = useHistory();
  const { categoryId } = match.params;
  const { id } = match.params;
  const [catAwards, setCatAwards] = useState([]);
  const [key, setKey] = useState("nominees");
  const [isOpen, setOpen] = useState(false);
  const [videoid, setVideoid] = useState("");
  const [comments, setComments] = useState([]);
  const [results, setResults] = useState(null);

  const fetchData = async () => {
    const { data } = await axios.get(
      `award/awardList?categoryId=${categoryId}`
    );
  
    setCatAwards(data.payload.filter((d) => d._id === id));
  };
  const fetchResults = async () => {
    if (isAuthenticated()) {
      let token=JSON.parse(localStorage.getItem("authToken"));
    
      token=(JSON.parse(token));

      const {data} = await axios.get(`award/results?id=${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setResults(data.payload.winner);
    }
  };

  const fetchComments = async () => {
    const { data } = await axios.get(`award/audienceComments?id=${id}`);

    setComments(data.payload);
  };

  const openModal = (id) => {
    setVideoid(id);
    setOpen(true);
  };
  useEffect(() => {
    fetchData();
    fetchComments();
    fetchResults();
  }, []);
  
  console.log(results);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.pHeading}>
          {catAwards.length > 0 ? catAwards[0].heading : ""}
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={videoid}
        onClose={() => setOpen(false)}
      />
      <Tabs
        defaultActiveKey="nominees"
        transition={false}
        className={styles.mb - 3}
      >
        <Tab eventKey="nominees" title="Nominees">
          <div className={styles.cards}>
            {catAwards.length > 0
              ? catAwards[0].nominations.map((cat, index) => (
                  <>
                    <div
                      key={index}
                      className={styles.card}
                      onClick={() => openModal(cat.ytlink)}
                    >
                      <img className={styles.image} src={cat.image} />
                      <div className={styles.video}></div>
                      <div className={styles.name}>
                       {cat.name}
                      </div>
                      <center><span className={styles.vote}>Vote Now</span></center>
                    </div>
                  </>
                ))
              : ""}
          </div>
        </Tab>
        <Tab eventKey="Jury" title="Jury">
          <ListGroup>
            {catAwards.length > 0
              ? catAwards[0].jurys.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <img className={styles.avatarimage} src={item.image} />
                      <p>@{item.name}</p>
                      <p>{item.comments}</p>
                    </ListGroup.Item>
                  );
                })
              : ""}
          </ListGroup>
        </Tab>
        <Tab eventKey="Results" title="Results">
          {
            isAuthenticated()?
         ( <Card className={styles.result} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={results ? results.image : ""} />
            <Card.Body>
            <Card.Title>Winner</Card.Title>
              <Card.Title>{results ? results.name : ""}</Card.Title>
            </Card.Body>
          </Card>):"Please Login"
          }
        </Tab>
          
        <Tab eventKey="Comments" title="Comments">
          <ListGroup>
            {comments.length > 0
              ? comments.map((item, index) => {
                  return (
                    <ListGroup.Item key={index} className={styles.commentcontainer}>
                      <img className={styles.avatar} src={item.user.avatar} />
                      <div>
                      <p className={styles.categoryUser}>
                        @{item.user.firstName + item.user.lastName} voted{" "}
                        {item.award.nominations.name}
                      </p>
                      <p className={styles.category}>{item.comment}</p>
                      </div>
                    </ListGroup.Item>
                  );
                })
              : ""}
          </ListGroup>
        </Tab>
      </Tabs>
    </div>
  );
}

export default FinalAwards;
