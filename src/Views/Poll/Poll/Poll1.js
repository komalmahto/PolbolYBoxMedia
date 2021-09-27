import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./Poll1.module.css";
function Poll1({ match }) {
  const history = useHistory();

  const { pollId } = match.params;
  const [pollData, setPollData] = useState(null);

  const handleFetch = () => {
    fetch(`https://backend.polbol.in/backend/poll/${pollId}`)
      .then((res) => res.json())
      .then((data) => setPollData(data));
  };

  const handleClick = () => {
    history.push("/polls");
  };

  useEffect(() => {
    handleFetch();
  }, [match]);

  return (
    <div>
      {pollData ? (
        <>
          <img className={styles.center} src={pollData.payload.image}></img>
          <h3 className={styles.list}>{pollData.payload.question}</h3>

          <div className={styles.container}>
            {pollData.payload.options.map((val, key) => {
              return (
                <div key={key} className={styles.list}>
                  {val.name}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}

      <div className={styles.backbtn} onClick={handleClick}>
        <button>
          {" "}
          <h4>Back to polls</h4>
        </button>
      </div>
    </div>
  );
}

export default Poll1;
