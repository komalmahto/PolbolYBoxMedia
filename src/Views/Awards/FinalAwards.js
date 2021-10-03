import React, { useState, useEffect } from "react";
import axios from "../../axios";

import { getSlug } from "../../helpers";
import { useHistory } from "react-router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";
import ListGroup from "react-bootstrap/ListGroup";

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

  const fetchData = async () => {
    const { data } = await axios.get(
      `award/awardList?categoryId=${categoryId}`
    );

    setCatAwards(data.payload.filter((d) => d._id === id));
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
  }, []);

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
      <Tabs defaultActiveKey="nominees" transition={false} className={styles.mb-3}>
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
                        <p>{cat.name}</p>
                      </div>
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
        <Tab eventKey="Results" title="Results"></Tab>
        <Tab eventKey="Comments" title="Comments">
          <ListGroup>
            {comments.length > 0
              ? comments.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <img className={styles.avatar} src={item.user.avatar} />
                      <p>
                        @{item.user.firstName + item.user.lastName} voted{" "}
                        {item.award.nominations.name}
                      </p>
                      <p>{item.comment}</p>
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
